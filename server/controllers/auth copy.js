import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body // данные приходящие с фронтенда

        const isUsed = await User.findOne({ username }) // ищем в базе пользователя по username

        if (isUsed) {                                   // если такой пользователь уже есть, завершаем регистрацию и отправляем сообщение
            return res.json({
                message: 'Данный username уже занят.'
            })
        }

        const salt = bcrypt.genSaltSync(10) // сложность пароля
        const hash = bcrypt.hashSync(password, salt) // хешируем пароль с определенной сложностью

        const newUser = new User({ // новый пользователь с захешированным пролем
            username,
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        await newUser.save() // сохранение нового пользователя в базц данных

        res.json({
            newUser,
            message: 'Регистрация прошла успешно!', // отправляем сообщение на фронтенд
        })
    } catch (error) {
        res.json({ message: 'Ошибка при создании пользователя.' })
    }
}
// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password) // сравнение с захешированным паролем

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль.'
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            token, user, message: 'Вы вошли в систему.',
        })

    } catch (error) {
        res.json({ message: 'Ошибка при авторизации.' })
    }
}
// Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.'
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })

    } catch (error) {
        res.json({ message: 'Нет доступа.' })
    }
}