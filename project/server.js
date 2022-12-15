const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/names', async (req, res) => {
    console.log('get')

    axios.get('https://api.api-ninjas.com/v1/babynames?popular_only=true',
        {
            headers: {
                'X-Api-Key': 'DXpeMKzGL2Bg7Vj0Vfvt9A==l4ruPimACsXlHwYx'
            }
        }
    )
        .then((response) => {
            console.log(response.data)
             res.json(response.data);
        })
        .catch(e => console.log(e));

    // fetch('https://api.namefake.com/hebrew-israel/random')
    //     .then(res => res.json())
    //     .then(results => res.json(results));
});

app.listen(6700, () => console.log('6700'));