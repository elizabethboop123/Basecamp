var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')


submitButton.addEventListener('click', run)

function run(event){
  event.preventDefault()
  var zipCode = zipCodeField.value
  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '')
  zipCode = zipCode.trim()

  axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')

    .then(function(response){
      if (response.data.erro){
        throw new Error('Cep inválido')
      }
      console.log(response.data)
      content.innerHTML = ''
      createLine(response.data.logradouro)
      createLine(response.data.bairro)
      createLine(response.data.localidade)

    })

    .catch(function (error) {
      content.innerHTML = ''
      console.log(error)
      createLine('Erro ao consultar!')

    })

    function createLine(text) {

      var line = document.createElement('p')
      var text = document.createTextNode(text)
      line.append(text)
      content.appendChild(line)

    }
}
