class Profile {
    constructor({username, name: {firstName, lastName}, password}) {
        this.username = username;
        this.name = {
            firstName,
            lastName
        };
        this.password = password;
    }

    createUser(callback) {
        return ApiConnector.createUser(
            {
                username: this.username,
                name: this.name,
                password: this.password
            }, (err, data) => {
            console.log(`Происходит создание пользователя ${this.username}.`);
            callback(err, data);
        });
    }
    
    performLogin(callback) {
        return ApiConnector.performLogin(
            {
                username: this.username,
                name: this.name,
                password: this.password 
            }, (err, data) => {
            console.log(`Происходит авторизация пользователя ${this.username}.`);
            callback(err, data);
        });
    }

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({currency,amount}, (err, data) => {
            console.log(`Пользователь ${this.username} планирует внести на счет ${amount} ${currency}.`);
            callback(err, data);
        });
    }

    convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
            console.log(`Планируется конвертация в ${targetAmount} ${targetCurrency} из ${fromCurrency}.`);
            callback(err, data);
        });
    }

    transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Производится перевод ${amount} пользователю ${to}.`);
            callback(err, data);
        });
    }
}

const rateOfCurrency = (callback) => {
    return ApiConnector.getStocks((err, data) => {
        console.log('Производится запрос курса валют с сервера.');
        callback(err, data);
    });
}

function main() {
    const SerViktor = new Profile({
        username: 'SerViktor',
        name: { firstName: 'Sergey', lastName: 'Gagulin' },
        password: '12345',
    });

    const IvanCher = new Profile({
        username: 'IvanCher',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });
    
    SerViktor.createUser((err, data) => {
        if (err) {
            console.error('Произошла ошибка при создании пользователя.');
        }else {
            console.log(`Создан пользователь ${SerViktor.username}.`);
            SerViktor.performLogin((err, data) => {
                if (err) {
                    console.error('Произошла ошибка при авторизации пользователя.');
                }else {
                    console.log(`Пользователь ${SerViktor.username} авторизован.`);
                    const userMoney = {currency: 'RUB', amount: 90000000};
                    SerViktor.addMoney(userMoney, (err, data) => {
                        if (err) {
                            console.error('Произошла ошибка при зачислении средств.');
                        }else {
                            console.log(`Пользователь ${SerViktor.username} внес на счет ${userMoney.amount} ${userMoney.currency}.`);
                            rateOfCurrency((err, data) => {
                                if (err) {
                                    console.error('Произошла ошибка при сборе данных.');
                                }else {
                                    let resultOfRateOfCurrency = data[93].RUB_NETCOIN
                                    const convertingMoney = {
                                        fromCurrency: userMoney.currency,
                                        targetCurrency: 'NETCOIN',
                                        targetAmount: 0
                                    };
                                    convertingMoney.targetAmount = resultOfRateOfCurrency*userMoney.amount
                                    SerViktor.convertMoney(convertingMoney, (err, data) => {
                                        if (err) {
                                            console.error('Произошла ошибка при авторизации пользователя.');
                                        }else {
                                            console.log(`Произведена конвертация ${userMoney.amount} ${convertingMoney.fromCurrency} в ${convertingMoney.targetAmount} ${convertingMoney.targetCurrency}.`);
                                            IvanCher.createUser((err, data) => {
                                                if (err) {
                                                    console.error('Произошла ошибка при создании пользователя.');
                                                }else {
                                                    console.log(`Создан пользователь ${IvanCher.username}.`);
                                                    const targetUser = {
                                                        to: 'IvanCher',
                                                        amount: convertingMoney.targetAmount
                                                    };
                                                    SerViktor.transferMoney(targetUser, (err, data) => {
                                                        if (err) {
                                                            console.error('Произошла ошибка при переводе средств.');
                                                        }else {
                                                            console.log(`Произведен перевод ${targetUser.amount} пользователю ${targetUser.to}.`);
                                                        }                                       
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }    
    });   
}
main()