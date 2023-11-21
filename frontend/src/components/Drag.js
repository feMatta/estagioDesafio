// Event listener para mudanças no input de arquivo
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
    const fileList = this.files;
  
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
  
      // Lê o arquivo como texto
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
  
        // Faz algo com o conteúdo do arquivo, por exemplo, extrai variáveis de um arquivo XML
        const xmlDoc = new DOMParser().parseFromString(fileContent, 'application/xml');
        const cnpj = xmlDoc.getElementsByTagName('CNPJ')[0].textContent;
        const xNome = xmlDoc.getElementsByTagName('xNome')[0].textContent;
        const vNF = xmlDoc.getElementsByTagName('vNF')[0].textContent;
        const dVenc = xmlDoc.getElementsByTagName('dVenc')[0].textContent;
        const xLgr = xmlDoc.getElementsByTagName('xLgr')[0].textContent;
        const nro = xmlDoc.getElementsByTagName('nro')[0].textContent;
        const xBairro = xmlDoc.getElementsByTagName('xBairro')[0].textContent;
        const xMun = xmlDoc.getElementsByTagName('xMun')[0].textContent;
        const UF = xmlDoc.getElementsByTagName('UF')[0].textContent;
        const CEP = xmlDoc.getElementsByTagName('CEP')[0].textContent;
  
        // Agora você pode usar essas variáveis conforme necessário
        console.log('CNPJ:', cnpj);
        console.log('xNome:', xNome);
        console.log('vNF:', vNF);
        console.log('dVenc:', dVenc);
        console.log('xLgr:', xLgr);
        console.log('nro:', nro);
        console.log('xBairro:', xBairro);
        console.log('xMun:', xMun);
        console.log('UF:', UF);
        console.log('CEP:', CEP);
  
        // Agora você pode enviar o arquivo ou fazer qualquer outra coisa com as variáveis extraídas
        sendFile(file, cnpj, xNome, vNF, dVenc, xLgr, nro, xBairro, xMun, UF, CEP);
      };
  
      reader.readAsText(file);
    }
  }
  
  function sendFile(file, cnpj, xNome, vNF, dVenc, xLgr, nro, xBairro, xMun, UF, CEP) {
    // Aqui você pode usar essas variáveis para algo específico do seu aplicativo
    // Por exemplo, você pode adicioná-las aos dados enviados para o servidor
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cnpj', cnpj);
    formData.append('xNome', xNome);
    formData.append('vNF', vNF);
    formData.append('dVenc', dVenc);
    formData.append('xLgr', xLgr);
    formData.append('nro', nro);
    formData.append('xBairro', xBairro);
    formData.append('xMun', xMun);
    formData.append('UF', UF);
    formData.append('CEP', CEP);
  
    const xhr = new XMLHttpRequest();
    // Restante do código para enviar o arquivo ao servidor
    // ...
  }
  

// Event listener para o botão de seleção de arquivo
const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");

fileSelect.addEventListener(
  "click",
  (e) => {
    if (fileElem) {
      fileElem.click();
    }
  },
  false
);

// Event listeners para arrastar e soltar
let dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  // Lidar com os arquivos soltos
  handleFiles(files);
}

// Envia arquivos para o servidor
function sendFile(file) {
  const reader = new FileReader();
  const xhr = new XMLHttpRequest();

  // Configurações do evento de progresso
  xhr.upload.addEventListener(
    "progress",
    (e) => {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded * 100) / e.total);
        console.log("Progresso:", percentage);
      }
    },
    false
  );

  // Configurações do evento de carga
  xhr.upload.addEventListener(
    "load",
    (e) => {
      console.log("Arquivo enviado com sucesso!");
    },
    false
  );

  // Configurações do evento de erro
  xhr.upload.addEventListener(
    "error",
    (e) => {
      console.error("Erro ao enviar o arquivo:", e);
    },
    false
  );

  // Configurações do evento de aborto
  xhr.upload.addEventListener(
    "abort",
    (e) => {
      console.warn("Envio de arquivo abortado:", e);
    },
    false
  );

  // Configurações da requisição AJAX
  xhr.open(
    "POST",
    "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php"
  );
  xhr.overrideMimeType("text/plain; charset=x-user-defined-binary");

  // Leitura do arquivo como string binária e envio
  reader.onload = (evt) => {
    xhr.send(evt.target.result);
  };

  // Inicia a leitura do arquivo
  reader.readAsBinaryString(file);
}
