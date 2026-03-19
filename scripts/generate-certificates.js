const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Asegurar que la carpeta de certificados existe
const certDir = path.join(__dirname, '..', 'public', 'certifications');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

// Función para crear el certificado del Bootcamp
function createBootcampCertificate() {
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margins: { top: 50, bottom: 50, left: 50, right: 50 }
  });

  const filePath = path.join(certDir, 'bootcamp-programacion.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  // Fondo degradado
  doc.rect(0, 0, doc.page.width, doc.page.height)
     .fill('#1a1a2e');

  // Border decorativo
  doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
     .stroke('#16213e', 3);

  doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
     .stroke('#0f4c75', 2);

  // Título principal
  doc.font('Helvetica-Bold')
     .fontSize(48)
     .fillColor('#3282b8')
     .text('CERTIFICADO DE FINALIZACIÓN', 0, 100, {
       align: 'center',
       width: doc.page.width
     });

  // Subtítulo
  doc.fontSize(28)
     .fillColor('#bbe1fa')
     .text('BOOTCAMP DE PROGRAMACIÓN', 0, 160, {
       align: 'center',
       width: doc.page.width
     });

  // Línea decorativa
  doc.moveTo(150, 220)
     .lineTo(doc.page.width - 150, 220)
     .stroke('#3282b8', 2);

  // Texto de certificación
  doc.fontSize(18)
     .fillColor('#ffffff')
     .text('Se certifica que', 0, 260, {
       align: 'center',
       width: doc.page.width
     });

  // Nombre del estudiante
  doc.fontSize(32)
     .fillColor('#3282b8')
     .text('HENRY ANDRES CASTRO', 0, 300, {
       align: 'center',
       width: doc.page.width
     });

  // Texto descriptivo
  doc.fontSize(16)
     .fillColor('#bbe1fa')
     .text('ha completado satisfactoriamente el programa de', 0, 350, {
       align: 'center',
       width: doc.page.width
     });

  doc.fontSize(20)
     .fillColor('#ffffff')
     .text('BOOTCAMP DE PROGRAMACIÓN BÁSICA', 0, 375, {
       align: 'center',
       width: doc.page.width
     });

  doc.fontSize(16)
     .fillColor('#bbe1fa')
     .text('ofrecido por el Ministerio de las TICs de Colombia', 0, 405, {
       align: 'center',
       width: doc.page.width
     });

  doc.text('en colaboración con la Universidad Tecnológica de Bolívar', 0, 425, {
    align: 'center',
    width: doc.page.width
  });

  // Fecha y duración
  doc.fontSize(14)
     .fillColor('#3282b8')
     .text('Fecha de finalización: Diciembre 2024', 150, 480);

  doc.text('Duración: 120 horas académicas', 150, 500);

  // Información de la institución
  doc.fontSize(12)
     .fillColor('#bbe1fa')
     .text('UNIVERSIDAD TECNOLÓGICA DE BOLÍVAR', 450, 480);

  doc.text('Cartagena, Colombia', 450, 495);
  doc.text('www.utb.edu.co', 450, 510);

  // Firma digital
  doc.fontSize(10)
     .fillColor('#ffffff')
     .text('Certificado digital verificable', 0, 550, {
       align: 'center',
       width: doc.page.width
     });

  doc.end();
  console.log('✅ Certificado del Bootcamp generado:', filePath);
}

// Función para crear el certificado de Linux
function createLinuxCertificate() {
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margins: { top: 50, bottom: 50, left: 50, right: 50 }
  });

  const filePath = path.join(certDir, 'personalizacion-linux.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  // Fondo negro estilo hacker
  doc.rect(0, 0, doc.page.width, doc.page.height)
     .fill('#000000');

  // Border terminal verde
  doc.rect(15, 15, doc.page.width - 30, doc.page.height - 30)
     .stroke('#00ff00', 3);

  doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50)
     .stroke('#00aa00', 1);

  // Terminal header
  doc.rect(35, 35, doc.page.width - 70, 40)
     .fill('#00ff00');

  doc.fontSize(12)
     .fillColor('#000000')
     .text('root@hack4u:~/certificates$ cat linux_customization.cert', 45, 50);

  // Título principal estilo terminal
  doc.font('Courier-Bold')
     .fontSize(36)
     .fillColor('#00ff00')
     .text('═══ CERTIFICADO DIGITAL ═══', 0, 120, {
       align: 'center',
       width: doc.page.width
     });

  // ASCII Art
  doc.fontSize(14)
     .fillColor('#00aa00')
     .text('     ╭─────────────────────────────────────╮', 0, 170, {
       align: 'center',
       width: doc.page.width
     });

  doc.text('     │     PERSONALIZACIÓN LINUX          │', 0, 185, {
    align: 'center',
    width: doc.page.width
  });

  doc.text('     │          HACK4U ACADEMY             │', 0, 200, {
    align: 'center',
    width: doc.page.width
  });

  doc.text('     ╰─────────────────────────────────────╯', 0, 215, {
    align: 'center',
    width: doc.page.width
  });

  // Información del estudiante
  doc.fontSize(16)
     .fillColor('#ffffff')
     .text('┌─ USUARIO CERTIFICADO:', 100, 260);

  doc.fontSize(24)
     .fillColor('#00ff00')
     .text('   HENRY_CASTRO@ARCH_LINUX', 100, 285);

  // Detalles del curso
  doc.fontSize(14)
     .fillColor('#ffffff')
     .text('├─ CURSO: Personalización Avanzada de Entornos Linux', 100, 320);

  doc.text('├─ INSTRUCTOR: S4vitar', 100, 340);
  doc.text('├─ INSTITUCIÓN: Hack4U Academy', 100, 360);
  doc.text('├─ DURACIÓN: 80 horas prácticas', 100, 380);
  doc.text('├─ MODALIDAD: Autodidacta - Práctica intensiva', 100, 400);

  // Skills adquiridas
  doc.fillColor('#00aa00')
     .text('└─ HABILIDADES ADQUIRIDAS:', 100, 430);

  doc.fontSize(12)
     .fillColor('#ffffff')
     .text('   • Configuración avanzada de Window Managers', 120, 450);
  doc.text('   • Personalización de shells (Zsh, Bash)', 120, 465);
  doc.text('   • Automatización con scripts y dotfiles', 120, 480);
  doc.text('   • Optimización de rendimiento del sistema', 120, 495);

  // Footer terminal
  doc.fontSize(10)
     .fillColor('#00ff00')
     .text('root@hack4u:~$ echo "Certificado verificado - 2023" | tee /var/log/cert.log', 50, 530);

  doc.end();
  console.log('✅ Certificado de Linux generado:', filePath);
}

// Generar ambos certificados
createBootcampCertificate();
createLinuxCertificate();

console.log('\n🎉 Todos los certificados han sido generados exitosamente!');
console.log('📁 Ubicación:', certDir);
