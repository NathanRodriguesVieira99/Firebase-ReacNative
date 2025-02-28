import React, { useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationProps } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';

export default function InitialScreen() {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigation = useNavigation<NavigationProps>();

    const handleSignUp = async () => {
        if (!email.includes('@') || !email.includes('.')) {
            Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro, a senha precisa de pelo menos 6 dígitos');
            return;
        }

        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                Alert.alert('Sucesso', 'Conta criada com sucesso!');

                setUserName('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                Alert.alert(error);
            });
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
            return;
        }

        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                Alert.alert('Sucesso', 'login realizado!');

                navigation.replace('WelcomeScreen');
            })
            .catch((error) => {
                Alert.alert(error);
            });
        navigation.replace('WelcomeScreen');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setUserName}
                value={userName}
                placeholder="Digite seu Nome"
            />

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Digite seu Email"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Digite sua senha"
                secureTextEntry
            />

            <TouchableOpacity
                onPress={handleSignUp}
                style={{
                    backgroundColor: 'blue',
                    width: '100%',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>
                    Cadastrar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignIn}
                style={{
                    backgroundColor: 'green',
                    width: '100%',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 12,
                }}>
                <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>
                    Acessar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
});
