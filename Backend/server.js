const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
const path = require('path');
const app = express();
const port = 5000;
const cors=require('cors')

app.use(bodyParser.json());
app.use(cors())

app.post('/calculate', (req, res) => {
    const { num1, num2 } = req.body;
    const result = parseFloat(num1) + parseFloat(num2);

    res.json({ result });

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet([{ 'Number 1': num1, 'Number 2': num2, 'Result': result }]);
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet 1');
    xlsx.writeFile(wb, 'public/output.xlsx');
});

app.get('/print', async (req, res) => {
    try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file://${path.join(__dirname, 'public', 'output.xlsx')}`);

    await page.goto(`file://${path.join(__dirname, 'public', 'output1.pdf')}`);

    await browser.close();
    console.log('Excel sheet converted to PDF');
    res.download('public/output.pdf');
    } catch (error){
        console.error('Error during PDF generation:', error);
        res.status(500).send('<h1>Your PDF is Generated</h1>');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
