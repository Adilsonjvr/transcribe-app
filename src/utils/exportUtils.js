import { jsPDF } from 'jspdf';
import { Document, Paragraph, TextRun, Packer } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Formata timestamp em segundos para MM:SS
 */
const formatTimestamp = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Exporta transcrição para PDF
 */
export const exportToPDF = (transcription, segments = [], metadata = {}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Título
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Transcrição de Áudio', margin, yPosition);
  yPosition += 15;

  // Data
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Data: ${new Date().toLocaleString('pt-BR')}`, margin, yPosition);
  yPosition += 10;

  // Adicionar metadados se disponíveis
  if (metadata.language) {
    doc.text(`Idioma: ${metadata.language}`, margin, yPosition);
    yPosition += 7;
  }
  if (metadata.wordCount) {
    doc.text(`Palavras: ${metadata.wordCount} | Caracteres: ${metadata.charCount}`, margin, yPosition);
    yPosition += 10;
  }

  // Linha separadora
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Conteúdo da transcrição
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');

  if (segments && segments.length > 0) {
    // Transcrição com timestamps e speakers
    segments.forEach((segment) => {
      // Verificar se precisa de nova página
      if (yPosition > pageHeight - margin - 20) {
        doc.addPage();
        yPosition = margin;
      }

      // Timestamp
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 200);
      const timestampText = `[${formatTimestamp(segment.start)}]`;
      doc.text(timestampText, margin, yPosition);

      // Speaker (se disponível)
      if (segment.speaker) {
        doc.setTextColor(200, 100, 100);
        doc.text(` ${segment.speaker}`, margin + 20, yPosition);
      }

      yPosition += lineHeight;

      // Texto do segmento
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);

      const lines = doc.splitTextToSize(segment.text, pageWidth - (2 * margin));
      lines.forEach((line) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 3; // Espaço entre segmentos
    });
  } else {
    // Transcrição simples
    const lines = doc.splitTextToSize(transcription, pageWidth - (2 * margin));
    lines.forEach((line) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  }

  // Rodapé em todas as páginas
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Página ${i} de ${pageCount} - Gerado por Transcribe App`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Salvar PDF
  const fileName = `transcricao_${Date.now()}.pdf`;
  doc.save(fileName);

  return { success: true, fileName };
};

/**
 * Exporta transcrição para DOCX
 */
export const exportToDOCX = async (transcription, segments = [], metadata = {}) => {
  const children = [];

  // Título
  children.push(
    new Paragraph({
      text: 'Transcrição de Áudio',
      heading: 'Heading1',
      spacing: { after: 200 }
    })
  );

  // Data e metadados
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Data: ${new Date().toLocaleString('pt-BR')}`,
          size: 20,
          color: '666666'
        })
      ],
      spacing: { after: 100 }
    })
  );

  if (metadata.language) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Idioma: ${metadata.language}`,
            size: 20,
            color: '666666'
          })
        ],
        spacing: { after: 100 }
      })
    );
  }

  if (metadata.wordCount) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Palavras: ${metadata.wordCount} | Caracteres: ${metadata.charCount}`,
            size: 20,
            color: '666666'
          })
        ],
        spacing: { after: 300 }
      })
    );
  }

  // Conteúdo da transcrição
  if (segments && segments.length > 0) {
    // Transcrição com timestamps e speakers
    segments.forEach((segment) => {
      const segmentChildren = [];

      // Timestamp
      segmentChildren.push(
        new TextRun({
          text: `[${formatTimestamp(segment.start)}] `,
          bold: true,
          color: '6464C8',
          size: 20
        })
      );

      // Speaker (se disponível)
      if (segment.speaker) {
        segmentChildren.push(
          new TextRun({
            text: `${segment.speaker}: `,
            bold: true,
            color: 'C86464',
            size: 20
          })
        );
      }

      // Texto do segmento
      segmentChildren.push(
        new TextRun({
          text: segment.text,
          size: 22
        })
      );

      children.push(
        new Paragraph({
          children: segmentChildren,
          spacing: { after: 200 }
        })
      );
    });
  } else {
    // Transcrição simples
    const paragraphs = transcription.split('\n');
    paragraphs.forEach((para) => {
      if (para.trim()) {
        children.push(
          new Paragraph({
            text: para,
            spacing: { after: 200 }
          })
        );
      }
    });
  }

  // Criar documento
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children
      }
    ]
  });

  // Gerar e salvar arquivo
  const blob = await Packer.toBlob(doc);
  const fileName = `transcricao_${Date.now()}.docx`;
  saveAs(blob, fileName);

  return { success: true, fileName };
};
