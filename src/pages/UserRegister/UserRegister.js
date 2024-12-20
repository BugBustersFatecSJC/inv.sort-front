import { useState, useEffect } from 'react'
import api from "../../services/api"
import Field from "../../components/Field/Field"
import MainPage from '../MainPage/MainPage'
import FlashMessage from '../../components/FlashMessage/FlashMessage'
import Select from '../../components/Select/Select'
import SendButton from '../../components/SendButton/SendButton'

function UserRegister() {
    const [name, setName] = useState('')
    const [role, setRole] = useState('admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const status = 'ativo'
    const [userImage, setUserImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    /**
     * Renderização da flash message
     */
    const [flash, setFlash] = useState(null)

    const showFlashMessage = (message, type) => {
        setFlash(null)
        setTimeout(() => {
            setFlash({ message, type })
        }, 0)
    }

    const flashSuccess = () => {
        showFlashMessage('Usuário cadastrado com sucesso!', 'success')
    }

    const flashErrorPassword = () => {
        showFlashMessage('As senhas não coincidem', 'error')
    }

    const flashError = () => {
        showFlashMessage('Um erro aconteceu', 'error')
    }

    const flashInfo = () => {
        showFlashMessage('Item atualizado', 'info')
    }

    /**
     * Registro do usuário
     */
    const registerUser = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            flashErrorPassword()
            return
        }

        const formData = new FormData()
        formData.append('username', name)
        formData.append('role', role)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('status', status)
        if (userImage) {
            formData.append('user_img', userImage)
        }

        console.log(role)

        try {
            await api.post('/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setUserImage(null)
            setImagePreview(null)

            flashSuccess()
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err.response ? err.response.data : err.message);
            flashError()
        }
    }

    /**
     * Renderiza a imagem selecionada no campo de imagem toda vez que ela for mudada
     */
    useEffect(() => {
        if (userImage) {
            const previewUrl = URL.createObjectURL(userImage)
            setImagePreview(previewUrl)
            return () => URL.revokeObjectURL(previewUrl)
        } else {
            setImagePreview(null)
        }
    }, [userImage])

    return (
        <MainPage title="Cadastre usuário">
            <form onSubmit={registerUser} className="flex flex-col md:flex-row items-center md:items-start mt-4">
                <div
                    className="bg-[#FFC376] p-[1rem] h-[14rem] w-[14rem] flex items-center justify-center border-8 border-[#D87B26] cursor-pointer mt-4 shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] shadow-[inset_-2px_5px_2px_2px_rgba(0,0,0,0.25)]"
                    onClick={() => document.getElementById('user-image-input').click()}
                >
                    <input
                        type="file"
                        id="user-image-input"
                        className="hidden"
                        onChange={(e) => {
                            setUserImage(e.target.files[0]);
                        }}
                        name="userImage"
                    />
                    <i className="fa-solid fa-plus text-5xl cursor-pointer"></i>

                    {imagePreview && (
                        <div className="mt-4">
                            <img src={imagePreview} alt="preview da imagem" className="w-full h-full z-10 object-cover relative top-0 left-0" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col w-full mt-3 md:ml-4">
                    <div className="flex w-full">
                        <div className="flex flex-col w-full md:w-1/2 mr-4">
                            <label className="text-2xl font-pixel">Nome</label>
                            <Field
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                            <label className="text-2xl font-pixel">Cargo</label>
                            <Select onChange={(e) => setRole(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="gerente">Gerente</option>
                                <option value="funcionario">Funcionário</option>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col w-full mt-3">
                        <label className="text-2xl font-pixel">Email</label>
                        <Field
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div className="flex w-full">
                        <div className="flex flex-col w-full mt-3 mr-4">
                            <label className="text-2xl font-pixel">Senha</label>
                            <Field
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="flex flex-col w-full mt-3">
                        <label className="text-2xl font-pixel">Confirmar Senha</label>
                            <Field
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className='mt-[40px]'>
                        <SendButton text="ENVIAR"/>
                    </div>
                </div>
            </form>

            {/* Componente flash message, verifica se o estado flash é true e então renderiza a flash message */}
            {flash && (
                <FlashMessage
                    message={flash.message}
                    type={flash.type}
                    duration={3000}
                    onClose={() => setFlash(null)}
                />
            )}
        </MainPage>
    )
}

export default UserRegister;
