const CLIENT_ID = '229547705481-3d6hsnjgrs0fr7pcq6oie0ob5l6te160.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD0QZxWNf7ZEFSuHrNNDmVqNm5CAV_RGWU';
const SHEET_ID = '1hiPiUiraXNMrk_OETHszG9NK6bAD5evZvQq5zP7BmHo';

let gapiLoaded = false;

function loadClient() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: 'https://www.googleapis.com/auth/spreadsheets',
    }).then(() => {
        gapiLoaded = true;
        console.log('Google API carregada!');
    }, (error) => {
        console.error('Erro ao carregar a API do Google: ', error);
    });
}

function appendDataToSheet(formData) {
    const params = {
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1:E1',
        valueInputOption: 'RAW',
    };

    const valueRangeBody = {
        values: [
            [formData.nome, formData.telefone, formData.finalidade, formData.corretor, new Date().toLocaleDateString()]
        ],
    };

    const request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then((response) => {
        console.log('Dados enviados para a planilha!', response);
        alert('Cadastro realizado com sucesso!');
    }, (error) => {
        console.error('Erro ao enviar dados para a planilha:', error);
        alert('Erro ao realizar o cadastro.');
    });
}

document.getElementById('cadastroForm').addEventListener('submit', (event) => {
    event.preventDefault();

    if (!gapiLoaded) {
        alert('A API do Google não foi carregada corretamente. Tente novamente.');
        return;
    }

    const formData = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        finalidade: document.getElementById('finalidade').value,
        corretor: document.getElementById('corretor').value
    };

    appendDataToSheet(formData);
});

loadClient();
