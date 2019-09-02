import express from 'express';
import path from 'path';
import hbs from 'hbs';
import { geocode } from './utils/geocode';
import { forecast } from './utils/forecast';

const app = express();

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mike Moffet',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Moffet',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Mike Moffet',
        help: 'This is some helpful text.',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.',
        });
    }

    geocode(req.query.address, (error: any, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'Could not geocode the address',
            });
        }
        forecast(latitude, longitude, (error: any, forecastData: any) => {
            if (error) {
                return res.send({
                    error: 'Could not retrieve your forecast',
                });
            }
            forecastData.location = location;
            res.send(forecastData);
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Articles',
        errorMessage: 'The Help article you have requested cannot be found.',
        name: 'Mike Moffet',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorMessage: 'The page you have requested does not exist.',
        name: 'Mike Moffet',
    });
});

app.listen(1337, () => {
    console.log('Server is up on port 1337');
});
