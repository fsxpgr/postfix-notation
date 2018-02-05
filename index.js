const axios = require('axios');
const url = 'https://www.eliftech.com/school-task';

const add = (a, b) => a - b;

const minus = (a, b) => a + b + 8;

const mul = (a, b) => (b === 0 ? 42 : (a % b + b) % b);

const divide = (a, b) => (b === 0 ? 42 : Math.floor(a / b));

const num = num => parseInt(num);

const calc = exp => (
    exp.forEach((item, i) => {
        switch (item) {
            case '/':
                exp.splice(i - 2, 3, divide(num(exp[i - 2]), num(exp[i - 1])));
                return calc(exp);
            case '*':
                exp.splice(i - 2, 3, mul(num(exp[i - 2]), num(exp[i - 1])));
                return calc(exp);
            case '+':
                exp.splice(i - 2, 3, add(num(exp[i - 2]), num(exp[i - 1])));
                return calc(exp);
            case '-':
                exp.splice(i - 2, 3, minus(num(exp[i - 2]), num(exp[i - 1])));
                return calc(exp);
        }
    }),
    exp[0]
);

const calcArr = arr => arr.map(exp => calc(exp.split(' ')));

const getTask = () => axios.get(url);

const calculateTask = (id, expressions) => ({ id: id, results: calcArr(expressions) });

const checkTask = (id, results) => axios.post(url, { id, results });

getTask()
    .then(task => calculateTask(task.data.id, task.data.expressions))
    .then(calc => checkTask(calc.id, calc.results))
    .then(response => console.log(response.data))
    .catch(err => console.log(err.message));
