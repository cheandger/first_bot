﻿const TelegramApi = require('node-telegram-bot-api')

const token = '5130544718:AAGyAeHjer85e8bSw77LraN438u5VfI50P0' 
               
const bot = new TelegramApi(token, {polling:true})

const chats = {}

const { gameOptions, againOptions } = require ('./options.js')




const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от нуля до девяти, попробуй отгадать')
    const randomNum = Math.floor(Math.random() * 10)
    chats[chatId] = randomNum
    await bot.sendMessage(chatId, 'Отгадывай!', gameOptions)
};

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие' },
        { command: '/info', description: 'Получить информацию о пользователе' },
        { command: '/game', description: 'Игра угадай цифру' }])


    bot.on('message', async msg => {

        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === `/start`) {
            await bot.sendMessage(chatId, 'Добро пожаловать в мой первый телеграмм бот');
            await console.log(msg)
            return bot.sendMessage(chatId, `https://tlgrm.ru/_/stickers/412/801/41280125-4d5d-4b51-bb95-198a64e75833/192/24.webp`);
            console.log(msg)
        };
        if (text === `/info`) {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}${msg.from.last_name}`)
        }

        if (text === '/game') {
            return startGame(chatId)

            return bot.sendMessage(chatId, 'Я тебя не понимаю, пожалуйста, попробуй еще раз');

        }
    });
}

    bot.on('callback_query', async msg => {

        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data != '/again') {
            await bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
        }
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `ты угадал цифру ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `нихрена ты не угадал, Святой Рандом выбрал цифру ${chats[chatId]}`, againOptions)
        }

    });



    start()
