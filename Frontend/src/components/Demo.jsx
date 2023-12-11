import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Demo() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('');

    const writeToExcel =async () => {
        try {
            const response = await axios.post('http://localhost:5000/calculate', { num1, num2 });
            const { data } = response;
            const sanitizedData = {
                'Number 1': num1,
                'Number 2': num2,
                'Result': data.result,
            };
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet([sanitizedData]);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
            XLSX.writeFile(wb, 'output.xlsx');

            setResult(`Result: ${data.result}`);
        } catch (error) {
            console.error('Error writing to Excel:', error);
            alert(" Please Turn on Your BackEnd First 👽 🤪 🤖 🤓 🦁 🐯 👀 🌈")
        }
      };

    const printToPDF = async () => {
        window.open('http://localhost:5000/print', '_blank');
        const pdf = new jsPDF();
        pdf.text(`Number 1: ${num1}`, 10, 10);
        pdf.text(`Number 2: ${num2}`, 10, 20);
        pdf.text(`Result: ${result}`, 10, 30);
        pdf.save('output.pdf');
    };
    return (
        <div>
                 <h1>Task 1</h1>
                 <div id='A'>
        <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label className='a'>Enter Number 1 :</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Number 1" value={num1} onChange={(e)=>{setNum1(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label className='a'>Enter Number 2 :</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Number 2" value={num2} onChange={(e)=>{setNum2(e.target.value)}}/>
      </Form.Group>
      </Form>
                <Button variant="success" onClick={writeToExcel} className='C'>Calculate</Button>
                <br />
                <Button variant="danger"onClick={printToPDF} className='C'>Print</Button>
                <br />
                <div id='B'>
               <h3>{result}</h3>
               </div>
            </div>  
        </div>
    );
}

export default Demo;
