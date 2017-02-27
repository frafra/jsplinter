document.querySelector('observationsMatrix > table')
    .setAttribute('data-Intro', 'These are your observations');

document.querySelector('observationsMatrix button')
    .setAttribute('data-Intro', 'You can remove an observation pressing on this button');

document.querySelector('observationsMatrix > table > tr:last-child')
    .setAttribute('data-Intro', 'You write a new observation on the last row...');

document.querySelector('observationsMatrix > table > tr:last-child button:last-child')
    .setAttribute('data-Intro', '...and add it pressing on the plus button');

document.querySelector('deltainput')
    .setAttribute('data-Intro', 'Here you can set the delta coefficient...');

document.querySelector('smoothnessinput')
    .setAttribute('data-Intro', '...while here you can set the normalization factor (it cannot be less than 0.01 if the system is rank deficient)');

document.querySelector('#graph')
    .setAttribute('data-Intro', 'The graph is updated automatically every time something has been changed');

introJs().start();
