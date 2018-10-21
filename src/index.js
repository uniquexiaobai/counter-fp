// import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { div, button } = hh(h);

function view(dispatch, state) {
    return div([
        div(`Count: ${state}`),
        button({
            onclick: () => dispatch('increase'),
        }, '+'),
        button({
            onclick: () => dispatch('decrease'),
        }, '-'),
    ]);
}

function reducer(type, state) {
    switch (type) {
        case 'increase':
            return state + 1;
        case 'decrease':
            return state - 1;
        default:
            return state;
    }
}

function app(initState, reducer, view, $root) {
    let state = initState;
    let currentView = view(dispatch, state);
    let rootNode = createElement(currentView);
    $root.appendChild(rootNode);

    function dispatch(type) {
        state = reducer(type, state);
        const updatedView = view(dispatch, state);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const $root = document.getElementById('root');
const initState = 0;

app(initState, reducer, view, $root);