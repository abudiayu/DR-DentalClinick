import jsPDF from 'jspdf'
import type { NursePatient } from '../types'

export async function generatePatientCardPDF(patient: NursePatient, qrDataUrl: string): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [85, 54] }) // credit card size

  // Background
  doc.setFillColor(13, 32, 68)
  doc.rect(0, 0, 85, 54, 'F')

  // Accent bar
  doc.setFillColor(6, 182, 212)
  doc.rect(0, 0, 85, 6, 'F')

  // Clinic name
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.text('DR. MUHAMMED ZAIN DENTAL CLINIC', 4, 12)

  // Card number
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(6, 182, 212)
  doc.text(patient.cardNumber, 4, 18)

  // Patient name
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text(patient.fullName, 4, 25)

  // Details
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(180, 200, 220)
  doc.text(`Age: ${patient.age}  |  ${patient.gender}`, 4, 31)
  doc.text(`Phone: ${patient.phone}`, 4, 36)
  doc.text(`Service: ${patient.serviceType}`, 4, 41)
  doc.text(`Date: ${patient.visitDate}`, 4, 46)

  // Payment badge
  const statusColor = patient.paymentStatus === 'Paid' ? [16, 185, 129] : patient.paymentStatus === 'Partial' ? [245, 158, 11] : [239, 68, 68]
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2])
  doc.roundedRect(4, 48, 20, 4, 1, 1, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(5)
  doc.text(patient.paymentStatus.toUpperCase(), 6, 51)

  // QR code
  if (qrDataUrl) {
    doc.addImage(qrDataUrl, 'PNG', 62, 18, 20, 20)
  }

  doc.save(`${patient.cardNumber}-${patient.fullName.replace(/\s+/g, '_')}.pdf`)
}
