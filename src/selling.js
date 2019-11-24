import React, { useEffect, useReducer } from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import API, { graphqlOperation } from '@aws-amplify/api'
import { listTodos } from './graphql/queries';
import { onCreateTodo } from './graphql/subscriptions';
import { createTodo } from './graphql/mutations';


const initialState = { todos: [] };
const reducer = (state, action) => {
    switch (action.type) {
        case 'QUERY':
            return { ...state, todos: action.todos }
        case 'SUBSCRIPTION':
            return { ...state, todos: [...state.todos, action.todo] }
        default:
            return state
    }
}

function Selling() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getData()

        const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
            next: (eventData) => {
                const todo = eventData.value.data.onCreateTodo;
                dispatch({ type: 'SUBSCRIPTION', todo })
            }
        })
        return () => subscription.unsubscribe()
    }, [])

    async function createNewTodo() {
        const todo = { name: "Use AppSync", description: "Realtime and Offline" }
        await API.graphql(graphqlOperation(createTodo, { input: todo }))
    }
    async function getData() {
        const todoData = await API.graphql(graphqlOperation(listTodos))
        dispatch({ type: 'QUERY', todos: todoData.data.listTodos.items });
    }

    return (
        <View style={styles.container}>
            <Button onPress={createNewTodo} title='Create Todo' />
            {state.todos.map((todo, i) => <Text key={todo.id}>{todo.name} : {todo.description}</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddeeff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

export default withNavigation(Selling)