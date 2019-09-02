const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messages = document.querySelectorAll('.message');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messages[1].textContent = 'Loading...';

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messages[1].textContent = 'An Error has occured: ' + data.error;
            } else {
                console.log(data);

                messages[0].textContent = data.location;
                messages[1].textContent = `Today the temperature is ${
                    data.temperature
                } degrees. The chance of precipitation is ${data.precipProbability * 100}%.`;
            }
        });
    });
});
