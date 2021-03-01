Vue.createApp({
    data() {
        return {
            goals: [],
            val: ''
        };
    },
    methods: {
        addGoal() {
            this.goals.push(this.val);
            this.val = '';
        }
    }
}).mount('#app');

// const goalInput = document.getElementById('goal-input');
// const addGoalBtn = document.getElementById('add-goal-btn');
// const ulList = document.getElementById('ul-list');

// function addGoal() {
//     const val = goalInput.value;
//     const li = document.createElement('li');
//     li.textContent = val;
//     ulList.appendChild(li);
//     goalInput.value = '';
// }

// addGoalBtn.addEventListener('click', addGoal);