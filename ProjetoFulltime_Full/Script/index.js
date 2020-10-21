//VARIÁVEIS GLOBAL
var tabela = document.getElementById("tabela-cadastros");
var tabelaEdit = "";
var formProdutos = document.querySelector("#produto-descricao");
var formPrincipal = document.getElementById("nomeData");
//INICIA AO CARREGAR O HTML
window.onload = function(){
    document.getElementById("adiciona").addEventListener("click",botaoAdicionar);
    document.getElementById("adicionaProduto").addEventListener("click", limparCampo);
    document.getElementById("adicionaProduto").addEventListener("click", escondeBotaoSalvarProduto);
    document.getElementById("modalEnviar").addEventListener("click", botaoEnviarModalProduto);
    document.getElementById("botaoEnviar").addEventListener("click", botaoEnviar);
    document.getElementById("botaoSalvar").addEventListener("click", botaoSalvarEdicao);
    document.getElementById("cancelar").addEventListener("click", botaoCancelarProduto);
    
    this.editarTabelaPrincipal();
    this.editarVendas();
    this.editarProdutos();
    this.removeLinhaTabela();
}
//BOTÃO PARA ADICIONAR NOVOS ITENS NA TABELA VENDA
function botaoAdicionar(){
    esconde1Tabela();
    limpaCampoProduto();
    escondeBotaoSalvar();
}
//BOTÃO ENVIAR PARA TABELA VENDAS
function botaoEnviar(){
    if(validacao()){
        adicionaTabelaPrincipal();
        esconde2Tabela();
        limpaCampoProduto();
    }
}
//BOTÃO SALVAR EDIÇÃO VENDAS
function botaoSalvarEdicao(){
    if(validacao()){
        esconde2Tabela();
        editarVendas();
    }
}
//BOTÃO ENVIAR PRODUTO(MODAL)
function botaoEnviarModalProduto(){
    if(validacaoModal()){
        escondeMensagemModal()
        criarTabelaProduto();
        limparCampo();
    }
}
//BOTÃO CANCELAR PRODUTO
function botaoCancelarProduto(){
    limpaCampoProduto();
    esconde2Tabela();
}
//CRIA TABELA VENDAS
function adicionaTabelaPrincipal(){                  
    //corpo da tabela
    var tabelaCadastros = document.getElementById("corpo-tabela");
    
    //linha e colunas da tabela
    var criaLinha = document.createElement("tr");
    var criaNome = document.createElement("td");
    var criaData = document.createElement("td");
    var criaValor = document.createElement("td");
    var criaEditar = document.createElement("td");
    var criaExcuir = document.createElement("td");
   
    //conteudo das colunas
    var nome = testeNome();
    var data = converteDataTexto(formPrincipal.dataVenda.value);    
    var valor = "R$ "+totalCliente();
    
    criaNome.classList.add("nomeCliente");
    criaData.classList.add("data");
    criaValor.classList.add("totalVendas");
    criaEditar.classList.add("eV");
    //criaExcuir.classList.add("d");
        
    criaNome.textContent = nome;
    criaData.textContent = data;
    criaValor.textContent = valor;
    criaEditar.innerHTML = templateEditar();
    criaExcuir.innerHTML = templateDeletar();

    //campo nome
    criaLinha.appendChild(criaNome);
    criaLinha.appendChild(criaData);
    criaLinha.appendChild(criaValor);
    criaLinha.appendChild(criaEditar);
    criaLinha.appendChild(criaExcuir);

    tabelaCadastros.appendChild(criaLinha);
}
//CRIA TABELA PRODUTOS
function criarTabelaProduto(){
    var formProduto = document.querySelector("#produto-descricao");

    var produtoNome = formProduto.item.value;
    var produtoQuantidade = formProduto.quantidadeProduto.value;
    var produtoValor = "R$ "+Number(formProduto.valorProduto.value).toFixed(2);
    var protutoValorTotal = "R$ "+Number(produtoValor.replace("R$ ", "")*produtoQuantidade).toFixed(2);
    
    var tabelaProduto = document.getElementById("tabela-produto-corpo");
    var linha = document.createElement("tr");
    var linhaProduto = document.createElement("td");
    var linhaQuantidade = document.createElement("td");
    var linhaValor = document.createElement("td");
    var linhaTotal = document.createElement("td");
    var linhaEditar = document.createElement("td");
    var linhaExcluir = document.createElement("td");
    
    linhaProduto.classList.add("nomeItem");
    linhaQuantidade.classList.add("quantidade");
    linhaValor.classList.add("valor");
    linhaEditar.classList.add("eP");
    linhaTotal.classList.add("total");
    
    linhaProduto.textContent = produtoNome;
    linhaQuantidade.textContent = produtoQuantidade;
    linhaValor.textContent = produtoValor; /* coloar o sifrão na frente depois */
    linhaTotal.textContent = protutoValorTotal;
    linhaEditar.innerHTML = templateEditarProdutos();
    linhaExcluir.innerHTML = templateDeletar();
    
    linha.appendChild(linhaProduto);
    linha.appendChild(linhaQuantidade);
    linha.appendChild(linhaValor);
    linha.appendChild(linhaTotal);
    linha.appendChild(linhaEditar);
    linha.appendChild(linhaExcluir);
    tabelaProduto.appendChild(linha);

    document.getElementById("mensagemTabelaVazia").classList.add("esconde");
}
//HTML do BOTÃO EDITAR VENDAS
function templateEditar(){
    return `<button class="btn btn-outline-warning text-body editar"><i class="material-icons ">edit</i></button>`
}
//HTML do BOTÃO EDITAR PRODUTOS
function templateEditarProdutos(){
    return `<button class="btn btn-outline-warning text-body editar" data-toggle="modal" data-target=".bd-example-modal-sm" id="editar"><i class="material-icons">edit</i></button>`
}
//HTML do BOTÃO EXCLUIR
function templateDeletar(){
    return `<button class="btn btn-outline-danger text-body delete"><i class="material-icons">delete</i></button>`
}
//VALIDAÇÃO PARA CAMPOS VAZIOS OU COM ESPAÇOS
function testeDoteste(item){
    batata = false;
    //caso campo seja menor que zero é porque não foi digitado nada nela.
    if(item.length > 0){
        for(var i = 0; i < item.length; i++){
            if(item[i] !== " "){
                batata = true //só é verdadeiro quando encontrar algum caracter diferente de espaço, ou seja, campo n esta em brando
                break;
            }else{
                batata = false;
            }
        }
    }else{batata = false}
    if(batata == true){
        return true;
    }else
        return false;
}
//VALIDAÇÃO PARA ENVIAR OS PRODUTOS PARA A TABELA DE VENDAS
function validacao(){
    var dataNome = false;
    var campoTabela = false;
    var tabelaProduto = [];
    
    var nomeC = formPrincipal.nomeCliente.value;
    var dataV = formPrincipal.dataVenda.value
  
    tabelaProduto = document.getElementById("tabela-produto-corpo").querySelectorAll("tr");
    //valida campo nome e data na tabela produtos
    if (testeDoteste(nomeC)&&testeDoteste(dataV)){
        document.getElementById("mensagemCampoVazio").classList.add("esconde");
        dataNome = true;       
    }else{
        document.getElementById("mensagemCampoVazio").classList.remove("esconde")
        dataNome = false;
    }
    //valida a tabela produtos
    if(!tabelaProduto.length < 1){
        document.getElementById("mensagemTabelaVazia").classList.add("esconde");
        campoTabela = true;
    }else{
        document.getElementById("mensagemTabelaVazia").classList.remove("esconde")
        campoTabela = false;
    }
    //se ambas forem verdadeiras retorna true
    if ( dataNome && campoTabela){
        return true;
    }else
        return false;
}
//VALIDAÇÃO PARA ENVIAR OS ITENS PARA TABELA DE ITEN
function validacaoModal(){
    validaNome = false;
    validaQuantidade = false;
    validaValor = false;
    var item = formProdutos.produtoNome.value;
      
    if(testeDoteste(item)){
        validaNome = true;
        document.querySelector("#campo-vazio-item").classList.add("esconde")
    }else{
        document.querySelector("#campo-vazio-item").classList.remove("esconde");
        validaNome = false;
    }
    if(formProdutos.produtoQuantidade.value > 0){
        validaQuantidade = true;
        document.querySelector("#campo-vazio-quantidade").classList.add("esconde")
    }else{
        document.querySelector("#campo-vazio-quantidade").classList.remove("esconde");
        validaQuantidade = false;
    }
    if(formProdutos.produtoValor.value > 0){
        validaValor = true;
        document.querySelector("#campo-vazio-valor").classList.add("esconde");
    }else{
        document.querySelector("#campo-vazio-valor").classList.remove("esconde");
        validaValor = false
    }
    if (validaNome && validaQuantidade && validaValor == true){
        document.querySelector("#modalEnviar").setAttribute("data-dismiss", "modal");
        document.querySelector("#modalSalvar").setAttribute("data-dismiss", "modal");
        return true
    }else{
        document.querySelector("#modalEnviar").removeAttribute("data-dismiss", "modal");
        document.querySelector("#modalSalvar").removeAttribute("data-dismiss", "modal");
        return false;       
    }
}
//CALCULA O DA TOTAL TABELA VENDAS
function totalCliente(){
    var arraysTabela = document.querySelectorAll(".total");
    var valoresArrays = [];
    var somaTotal = 0;
   
    for (var i = 0; i < arraysTabela.length; i++){
        valoresArrays[i] = Number(arraysTabela[i].textContent.replace("R$ ", ""));//array zerado recebe o valor do array dos totais
        somaTotal += Number(valoresArrays[i]); 
     }
     return somaTotal.toFixed(2);
}
//BOTÃO EXCLUIR/DELETAR LINHA
function removeLinhaTabela(){
    var tabela = document.querySelectorAll("table")
    tabela.forEach(function(tabela){
        tabela.addEventListener("mouseover", function(){
            var excluirLinha =  document.querySelectorAll(".delete")
            excluirLinha.forEach(function(excluirLinha) {
                excluirLinha.addEventListener("click", function(){ this.parentNode.parentNode.remove();})
            });  
        })
    })
}
//BOTÃO EDITAR TABELAS VENDA/PRODUTO
function editarTabelaPrincipal(){
    var tabela = document.querySelectorAll("table") 
    tabela.forEach(function(tabela){
        tabela.addEventListener("mouseover", function(){
            if(tabela.id == "tabela-cadastros"){
                var botaoEditar =  document.querySelectorAll(".eV")
                    botaoEditar.forEach(function(botaoEditar) {
                         botaoEditar.addEventListener("click", function(){ 
                           
                            limpaCampoProduto();
                            esconde1Tabela();
                            escondeBotaoEnviar();
                            
                            var nome =  this.parentNode.querySelector(".nomeCliente").textContent;
                            var data = converteTextoData(this.parentNode.querySelector(".data").textContent);

                            formPrincipal.nomeCliente.value = nome;
                            formPrincipal.dataVenda.value = data;

                            tabelaEdit = this.parentNode;
                        }) 
                });
            }
            else{
                var botaoEditar =  document.querySelectorAll(".eP")
                    botaoEditar.forEach(function(botaoEditar) {
                        botaoEditar.addEventListener("click", function(){

                        escondeMensagemModal();
                        escondeBotaoEnviarProduto();

                        var item =  this.parentNode.querySelector(".nomeItem").textContent;
                        var quantidade = this.parentNode.querySelector(".quantidade").textContent;
                        var valor = this.parentNode.querySelector(".valor").textContent.replace("R$ ", "");

                        formProdutos.produtoNome.value = item;
                        formProdutos.produtoQuantidade.value = quantidade;
                        formProdutos.produtoValor.value = valor;

                        tabelaEdit = this.parentNode;
                    }) 
                });
            }
        })
    })
}
//BOTÃO SALVAR VENDAS
function editarVendas(){
    document.querySelector("#botaoSalvar").addEventListener("click", function(event){
        event.preventDefault();
        if(validacao()){
            if(tabelaEdit !== ""){
                tabelaEdit.querySelector(".nomeCliente").textContent = formPrincipal.nomeCliente.value;
                tabelaEdit.querySelector(".data").textContent = converteDataTexto(formPrincipal.dataVenda.value);
                tabelaEdit.querySelector(".totalVendas").textContent = "R$ "+totalCliente();
            
                tabelaEdit = "";

                formPrincipal.nomeCliente.value = ""
                formPrincipal.dataVenda.value = ""
                    
                escondeBotaoSalvar();
                teste = false;
            }
        }
    })
}
//BOTÃO SALVAR PRODUTOS
function editarProdutos(){
    document.querySelector("#modalSalvar").addEventListener("click", function(event){
        event.preventDefault();
        
        if(validacaoModal()){
            if(tabelaEdit !== ""){
                tabelaEdit.querySelector(".nomeItem").textContent = formProdutos.produtoNome.value;
                tabelaEdit.querySelector(".quantidade").textContent =  Number(formProdutos.produtoQuantidade.value);
                tabelaEdit.querySelector(".valor").textContent = "R$ "+Number(formProdutos.produtoValor.value).toFixed(2);
                tabelaEdit.querySelector(".total").textContent = "R$ "+Number(formProdutos.produtoQuantidade.value*formProdutos.produtoValor.value).toFixed(2);
                
                formProdutos.produtoNome.value = ""
                formProdutos.produtoQuantidade.value = ""
                formProdutos.produtoValor.value = "";
                
                tabelaEdit = "";
                
                escondeBotaoSalvarProduto();
            }
        }
    })
}
//METODO PARA LIMPAR A TABELA PRODUTOS = MODO NÃO EDIÇÃO
function limpaCampoProduto(){
    document.querySelector("#nomeData").nomeCliente.value = "";
    document.querySelector("#nomeData").dataVenda.value = "";
    var limpaTabelaProduto = document.getElementById("tabela-produto-corpo");
      
    var listaTR = [];

    listaTR = limpaTabelaProduto.querySelectorAll("tr");
    listaTR.forEach(function(listaTR){ 
        listaTR.remove();
    })
    document.getElementById("mensagemCampoVazio").classList.add("esconde");
    document.getElementById("mensagemTabelaVazia").classList.add("esconde");
}
//LIMPA OS CAMPOS DO MODAL
function limparCampo(){
    document.querySelector("#produto-descricao").item.value = "";
    document.querySelector("#produto-descricao").quantidadeProduto.value = 1;
    document.querySelector("#produto-descricao").valorProduto.value = 1;
}
//ALTERNÂNCIA DA TABELA VENDAS PARA PRODUTOS
function esconde1Tabela(){
    document.getElementById("primeiro").classList.add("esconde");
    document.getElementById("segundo").classList.remove("esconde");
    document.getElementById("adiciona").classList.add("esconde");
}
//ALTERNÂNCIA DA TABELA PRODUTOS PARA VENDA
function esconde2Tabela(){
    document.getElementById("primeiro").classList.remove("esconde");
    document.getElementById("segundo").classList.add("esconde");
    document.getElementById("adiciona").classList.remove("esconde");
}
//ESCONDE O BOTÃO ENVIAR DA TABELA PRODUTOS, EM MODO EDIÇÃO
function escondeBotaoEnviar(){
    document.getElementById("botaoEnviar").classList.add("esconde");
    document.getElementById("botaoSalvar").classList.remove("esconde");
}
//ESCONDE O BOTÃO SALVAR DA TABELA PRODUTOS, EM MODO CADASTRO
function escondeBotaoSalvar(){
    document.getElementById("botaoEnviar").classList.remove("esconde");
    document.getElementById("botaoSalvar").classList.add("esconde");
}
//ESCONDE O BOTÃO ENVIAR DO MODAL PRODUTOS, EM MODO EDIÇÃO
function escondeBotaoEnviarProduto(){
    document.getElementById("modalSalvar").classList.remove("esconde");
    document.getElementById("modalEnviar").classList.add("esconde");
}
//ESCONDE O BOTÃO SALVAR DO MODAL PRODUTOS, EM MODO CADASTRO
function escondeBotaoSalvarProduto(){
    document.getElementById("modalSalvar").classList.add("esconde");
    document.getElementById("modalEnviar").classList.remove("esconde");
}
//ESCONDE MENSAGENS DE FALTA DE INFORMAÇÃO NOS CAMPOS DO MODAL
function escondeMensagemModal(){
    document.querySelector("#campo-vazio-item").classList.add("esconde")
    document.querySelector("#campo-vazio-quantidade").classList.add("esconde");
    document.querySelector("#campo-vazio-valor").classList.add("esconde");
}
//PEGA O NOME DA TABELA PRODUTOS
function testeNome(){
    var nome = formPrincipal.nomeCliente.value;
    return nome;
}
//MASCARA BARATA DE DATA PARA TEXTO
function converteDataTexto(data){
    return data.split('-').reverse().join('/');
}
//MASCARA BARATA DE TEXTO PARA DATA
function converteTextoData(data){
    return data.split('/').reverse().join('-');
    //return new Date(...data.split('-').map((item, indice) => item - indice % 2));
}