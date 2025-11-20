const URL_BASE = 'http://localhost:3000';

const CONTENT = document.getElementById('content');
const FORM = document.getElementById('form-descarte');
const MSG = document.getElementById('message');
const ID = document.getElementById('descarte-id');
const NAME = document.getElementById('name');
const BAIRRO = document.getElementById('bairro');
const LOCAL = document.getElementById('local');
const CATEGORIA = document.getElementById('categoria');
const LAT = document.getElementById('geolocalizacao-lat');
const LON = document.getElementById('geolocalizacao-lon');

function showMessage(text, isSuccess = true) {
    MSG.textContent = text;
    MSG.className = isSuccess ? 'msg success' : 'msg error';
    setTimeout(() => {
        MSG.className = 'hidden';
    }, 3000);
}

async function readAll() {
    CONTENT.innerHTML = '<p>Carregando pontos de descarte...</p>';
    
    try {
      const res = await fetch(URL_BASE + '/descarte');
      const data = await res.json();
      renderList(data);
    
    } catch (error) {
        CONTENT.innerHTML = `<p>Erro ao conectar com a API: ${error.message}.</p>`;
    }
}

async function handleInsertOrUpdate(event) {
    event.preventDefault();

    const id = ID.value;
    
    const descarte = {
        name: NAME.value,
        bairro: BAIRRO.value,
        local: LOCAL.value,
        categoria: CATEGORIA.value.split(',').map(s => s.trim()).filter(s => s.length > 0),
        geolocalizacao: {
            latitude: parseFloat(LAT.value),
            longitude: parseFloat(LON.value),
        }
    };
    
    let url = URL_BASE + '/descarte'; 
    let method = 'POST';
    
    if (id) {
        url += `/${id}`;
        method = 'PATCH';
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(descarte)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }

        const action = id ? 'Atualizado' : 'Inserido';
        showMessage(`Ponto de Descarte ${action} com sucesso!`, true);
        
        clearForm();
        readAll();
        
    } catch (error) {
        console.error('Erro na operação:', error);
        showMessage(`ERRO: Falha ao ${method === 'POST' ? 'inserir' : 'atualizar'}. ${error.message}`, false);
    }
}

// DELETAR 
async function deleteDescarte(id) {
    if (!confirm('Deseja realmente apagar o Ponto de Descarte?')) { 
        return;
    }

    try {
        const res = await fetch(URL_BASE + '/descarte/' + id, { method: 'DELETE' });

        if (!res.ok) {
            throw new Error(errorData.message || `Erro HTTP: ${res.status}`);
        }

        showMessage(`Ponto ${id} excluído com sucesso.`, true);
        readAll();
        
    } catch (error) {
        showMessage(`Falha ao deletar: ${error.message}`, false);
    }
}

async function findDescarte(id) {
    try {
        const res = await fetch(URL_BASE + '/descarte/' + id);
        const dados = await res.json();
        
        ID.value = dados._id || dados.id;
        NAME.value = dados.name;
        BAIRRO.value = dados.bairro;
        LOCAL.value = dados.local;
        CATEGORIA.value = dados.categoria.join(', ');
        LAT.value = dados.geolocalizacao.latitude;
        LON.value = dados.geolocalizacao.longitude;
        
    } catch {
        showMessage(`Erro ao buscar dados para edição. ${error.message}`, false);
    }
}

function clearForm() {
    ID.value = '';
    FORM.reset();
}

function renderList(lista) {
    CONTENT.innerHTML = "";

    lista.forEach(d => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${d.name}</h3>
            <p>Bairro: ${d.bairro}</p>
            <p>Local: ${d.local}</p>
            <p>Categorias: ${d.categoria.join(", ")}</p>
            <p>Geo: ${d.geolocalizacao.latitude}, ${d.geolocalizacao.longitude}</p>

            <button onclick="findDescarte('${d._id}')">Editar</button>
            <button onclick="deleteDescarte('${d._id}')">Excluir</button>
        `;

        CONTENT.appendChild(card);
    });
}

window.onload = readAll;