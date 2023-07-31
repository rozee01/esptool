async function connect() {
  try {
    // Request access to the serial port
    const port = await navigator.serial.requestPort();

    // Open the serial port
    await port.open({ baudRate: 115200, dataBits: 8, parity: 'none', stopBits: 1 });
    console.log(port);
    // Check if the connection is established
    if (port.readable) {
      console.log("Connection to ESP board is established and port opened");
      document.getElementById('status').textContent="Connected";
      
    } else {
      console.log('Failed to establish connection to ESP board.');
    }

  } catch (error) {
    console.error('Error:', error);
  }
};


var fileInputs = document.querySelectorAll('input[type="file"]');
var fileNames= document.querySelectorAll('span');
  for (let i = 0; i < fileInputs.length; i++) {
    fileInputs[i].addEventListener('change', function() {
      var fileInput = this;
      if (fileInput.files && fileInput.files[0]) {
        fileNames[i].textContent = fileInput.files[0].name;
        fileNames[i].style.display = "block";
      } else {
        fileNames[i].textContent = "";
        fileNames[i].style.display = "none";
      }
    });
  }
document.getElementById('send-btn').addEventListener('click', function() {
    document.getElementsByTagName('form')[0].submit();
  });
