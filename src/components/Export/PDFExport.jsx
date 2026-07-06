import jsPDF from 'jspdf'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { getEmotionById } from '../../lib/emotions'

export const exportJournalToPDF = (journal) => {
  const doc = new jsPDF()

  // Colors
  const primaryColor = [99, 102, 241] // Indigo
  const textColor = [30, 41, 59] // Slate 800

  // Header
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, 220, 40, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('EmotionJournal', 20, 25)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Journal Export', 20, 33)

  // Date
  doc.setTextColor(...textColor)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(
    format(new Date(journal.entry_date), 'EEEE, d MMMM yyyy', { locale: id }),
    20,
    55
  )

  // Emotions
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Emosi:', 20, 65)

  let emotionX = 45
  journal.emotions.forEach((emotionId) => {
    const emotion = getEmotionById(emotionId)
    if (emotion) {
      // Emotion background
      const hex = emotion.color
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      
      doc.setFillColor(r, g, b)
      const textWidth = doc.getTextWidth(`${emotion.name} (${emotion.nameId})`)
      doc.roundedRect(emotionX - 2, 58, textWidth + 10, 10, 3, 3, 'F')

      doc.setTextColor(30, 41, 59)
      doc.text(`${emotion.name} (${emotion.nameId})`, emotionX + 3, 65)
      emotionX += textWidth + 15
    }
  })

  // Content
  doc.setTextColor(...textColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Isi Journal:', 20, 85)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  
  const splitText = doc.splitTextToSize(journal.content, 170)
  doc.text(splitText, 20, 95)

  // Footer
  const pageHeight = doc.internal.pageSize.height
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184)
  doc.text(
    `Di-export dari EmotionJournal pada ${format(new Date(), 'd MMMM yyyy, HH:mm', { locale: id })}`,
    20,
    pageHeight - 15
  )

  // Save
  const filename = `journal-${format(new Date(journal.entry_date), 'yyyy-MM-dd')}.pdf`
  doc.save(filename)

  return filename
}

export const exportMultipleJournalsToPDF = (journals) => {
  const doc = new jsPDF()

  const primaryColor = [99, 102, 241]
  const textColor = [30, 41, 59]

  let yPosition = 20

  // Header
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, 220, 30, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('EmotionJournal - Export Multiple', 20, 18)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(
    `${format(new Date(journals[0].entry_date), 'd MMM yyyy')} - ${format(new Date(journals[journals.length - 1].entry_date), 'd MMM yyyy')}`,
    20,
    25
  )

  yPosition = 45

  journals.forEach((journal, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    // Journal entry
    doc.setTextColor(...primaryColor)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(
      format(new Date(journal.entry_date), 'EEEE, d MMMM yyyy', { locale: id }),
      20,
      yPosition
    )

    yPosition += 8

    // Emotions
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    const emotionText = journal.emotions
      .map((e) => {
        const emotion = getEmotionById(e)
        return emotion ? `${emotion.name}` : e
      })
      .join(', ')
    doc.setTextColor(100, 116, 139)
    doc.text(`Emosi: ${emotionText}`, 20, yPosition)

    yPosition += 8

    // Content
    doc.setTextColor(...textColor)
    doc.setFontSize(10)
    const splitText = doc.splitTextToSize(journal.content, 170)
    const contentHeight = splitText.length * 5
    
    if (yPosition + contentHeight > 280) {
      doc.addPage()
      yPosition = 20
    }
    
    doc.text(splitText, 20, yPosition)
    yPosition += contentHeight + 10

    // Divider
    if (index < journals.length - 1) {
      doc.setDrawColor(226, 232, 240)
      doc.line(20, yPosition - 5, 190, yPosition - 5)
    }
  })

  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text(
      `Halaman ${i} dari ${pageCount}`,
      105,
      doc.internal.pageSize.height - 10
    )
  }

  const filename = `journal-export-${format(new Date(), 'yyyy-MM-dd')}.pdf`
  doc.save(filename)

  return filename
}
