import { Component } from '@angular/core';
import { PillService } from '../service/pill-service';

@Component({
  selector: 'app-pdf-download-component',
  standalone: false,
  templateUrl: './pdf-download-component.html',
  styleUrl: './pdf-download-component.css',
})
export class PdfDownloadComponent {
  constructor(private pillService: PillService) { }

  descargarReporte() {
    // Datos de ejemplo para el endpoint
    const dias = 7;
    const tomasAlDia = 3;
    const fechaInicio = new Date().toISOString(); // Formato: 2024-05-20T10:00:00

    this.pillService.generateCalendarPdf(dias, tomasAlDia, fechaInicio).subscribe({
      next: (blob: Blob) => {
        // 1. Creamos un objeto URL a partir del Blob recibido
        const data = window.URL.createObjectURL(blob);

        // 2. Creamos un elemento <a> invisible
        const link = document.createElement('a');
        link.href = data;

        // 3. Definimos el nombre que tendrá el archivo al descargarse
        link.download = `calendario-tomas-${new Date().getTime()}.pdf`;

        // 4. Simulamos el clic para disparar la descarga en el navegador
        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));

        // 5. Limpieza: eliminamos la URL creada para no saturar la memoria del navegador
        setTimeout(() => {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
      error: (err: any) => {
        console.error('Error al descargar el PDF:', err);
        alert('No se pudo generar el PDF. Revisa la consola.');
      }
    });
  }
}
