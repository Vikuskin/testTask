let counter = 0;
let position;
let score = 0;

const startQuestions = () => {
  const questionsCommon = document.querySelectorAll('.question-common');
  questionsCommon[counter].style.display = 'flex';
  const button = questionsCommon[counter].querySelector('button');
  const inputs = questionsCommon[counter].querySelectorAll('input');
  
  button.addEventListener('click', () => {
    const inputChecked = Array.from(inputs).filter(elem => elem.checked === true);
    if (!inputChecked[0]) {
      return;
    }

    if (inputChecked[0].name === 'question question-position'){
      position = inputChecked[0].value;
    } else if (inputChecked[0].name === 'question question-exp') {
      score = +inputChecked[0].value;
    }
    questionsCommon[counter].style.display = 'none';
    counter++;
    if (counter < questionsCommon.length - 1 || counter === questionsCommon.length - 1) {
      questionsCommon[counter].style.display = 'flex';
      checkedFalse(inputs);
      startQuestions();
      return;
    } else if (counter > questionsCommon.length - 1 && position === "test") {
      checkedFalse(inputs);
      testQuestions();
      return;
    } else if (counter > questionsCommon.length - 1 && position === "front") {
      counter = 0;
      checkedFalse(inputs);
      mainQuestion(".questions-frontend");
      return;
    } else if (counter > questionsCommon.length - 1 && position === "designer") {
      counter = 0;
      checkedFalse(inputs);
      mainQuestion(".questions-designer");
      return;
    } 
    return
  });
};
startQuestions();

const checkedFalse = (inputs) => {
  inputs = Array.from(inputs);
  inputs.forEach(input => {
    input.checked = false;
  })
}

const mainQuestion = position => {
  const question = document.querySelectorAll(`${position}`);
  question[counter].style.display = 'flex';
  const button = question[counter].querySelector('button');
  const inputs = question[counter].querySelectorAll('input');
  if (inputs[0].type === 'number') {
          inputs[0].addEventListener('input', () => {
            inputs[0].value = inputs[0].value.replace(/[^0-9+]/, '')
            if (inputs[0].value > 10) {
              inputs[0].value = 10
            }
          })
        }
  button.addEventListener('click', () => {
    if (inputs[0].type === 'number' && inputs[0].value === '') {
      return;
    } else if (inputs[0].type === 'number' && inputs[0].value > 0) {
      score -= 50;
    } else if (inputs[0].type === 'number' && inputs[0].value == 0) {
      score += 20;
    } else if (inputs[0].type === 'radio') {
      const inputChecked = Array.from(inputs).filter(elem => elem.checked === true);
      if (!inputChecked[0]) {
        return;
      }
      score += +inputChecked[0].value;
    }
    checkScore();

    question[counter].style.display = 'none';
    counter++;

    if (counter > question.length - 1) {
      if (score > 50) {
        const questionAdd = document.querySelector(`${position}__add`);
        questionAdd.style.display = 'flex';
        const inputs = questionAdd.querySelectorAll('input');
        questionAdd.querySelector('button').addEventListener('click', () => {
            const inputChecked = Array.from(inputs).filter(elem => elem.checked === true);
            score = Math.floor(score * (+inputChecked[0].value));
            checkScore();
            questionAdd.style.display = 'none';
            getResult();
        })
        return;
      } else {
        getResult();
        return;
      }
    }

    question[counter].style.display = 'flex';
    mainQuestion(position);
  })
}

const testQuestions = () => {
  const questionsTest = document.querySelector('.questions-test');
  questionsTest.style.display = 'flex';
  counter = 0;
  score = 0;
  questionsTest.querySelector('button').addEventListener('click', () => {
    questionsTest.style.display = 'none';
    startQuestions();
  });  
}

const getResult = () => {
  if (score < 50 || score === 50) {
    alert('К сожалению, нам с тобой не по пути.')
  } else if (score < 80 || score === 80) {
    alert('Ну если больше никто не придёт, то возьмём тебя')
  } else {
    alert('Проверь почту, там уже лежит оффер')
  }
}

const checkScore = () => {
  if (score < 0) {
    score = 0;
  } else if (score > 100) {
    score = 100;
  }
  return score;
}