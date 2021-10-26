
const fetchUsers = () => {
    axios.get('http://localhost:3000/agenda')
        .then(response => {
            console.log(`GET list users`, response.data[0].descricaoServico);
            document.getElementById("tituloServico").innerHTML = response.data[0].descricaoServico
        })
        .catch(error => console.error(error));
};

fetchUsers();