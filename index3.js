import Esptool from 'esptool-js';

async function flashFirmware() {
  const esptool = new Esptool();

  // Prompt the user to select a serial port
  const port = await navigator.serial.requestPort();

  // Set the paths to the bootloader and partitions binary files
  const bootloaderPath = './bootloader_dio_80m.bin';
  const partitionsPath = './programme_yedhwi.ino.partitions.bin';

  // Set the firmware binary file path
  const firmwarePath = './programme_yedhwi.ino.bin';
  const bootappPath = './boot_app0.bin';

  try {
    // Connect to the ESP32
    await esptool.connect(port);

    // Erase flash memory
    await esptool.eraseFlash();

    await esptool.writeFlash(bootappPath, 0x0);

    // Flash the bootloader
    await esptool.writeFlash(bootloaderPath, 0x1000);

    // Flash the partitions
    await esptool.writeFlash(partitionsPath, 0x8000);

    // Flash the firmware
    await esptool.writeFlash(firmwarePath, 0x10000);

    console.log('Firmware flashed successfully!');
  } catch (error) {
    console.error('Error flashing firmware:', error);
  } finally {
    // Disconnect from the ESP32
    esptool.disconnect();
  }
}


var fileInputs = document.querySelectorAll('input[type="file"]');
var fileNames = document.querySelectorAll("span");
for (let i = 0; i < fileInputs.length; i++) {
  fileInputs[i].addEventListener("change", function () {
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
