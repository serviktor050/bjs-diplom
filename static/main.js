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
            console.log(`Создан пользователь ${this.username}.`);
            callback(err, data);
        });
    }
    
    performLogin(callback) {
        return ApiConnector.createUser(
            {
                username: this.username,
                name: this.name,
                password: this.password 
            }, (err, data) => {
            console.log(`Пользователь ${this.username} авторизован.`);
            callback(err, data);
        });
    }

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({currency,amount}, (err, data) => {
            console.log(`Пользователь ${this.username} внес на счет ${amount} ${currency}.`);
            callback(err, data);
        });
    }

    convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
            console.log(`Произведена конвертация ${targetAmount} из ${fromCurrency} в ${targetCurrency}.`);
            callback(err, data);
        });
    }

    transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Переведено ${amount} пользователю ${to}.`);
            callback(err, data);
        });
    }
}

const rateOfCurrency = (callback) => {
    return ApiConnector.getStocks((err, data) => {
        console.log('Произведен запрос курса валют.');
        callback(err, data);
    });
}
/*
let resultRateOfCurrency = rateOfCurrency(callback);
console.log(resultRateOfCurrency);
*/
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
            console.log(`Создан пользователь ${SerViktor.username}.`)
        }    
    });

    SerViktor.performLogin((err, data) => {
        if (err) {
            console.error('Произошла ошибка при авторизации пользователя.');
        }else {
            console.log(`Пользователь ${SerViktor.username} авторизован.`)
        }
    });

    SerViktor.addMoney({currency: 'RUB', amount: 100}, (err, data) => {
        if (err) {
            console.error('Произошла ошибка при зачислении средств.');
        }else {
            console.log(`Пользователь ${SerViktor.username} внес на счет ${amount} ${currency}.`);
        }
    });
}
main()