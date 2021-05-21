import { Component, OnInit, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { CommentService } from 'src/app/core/modules/global/comment/shared/services/comment.service';
import { Router } from '@angular/router';
import { CommentGeneral } from '../shared/models/comment-general.model';
import { Subject } from 'rxjs/internal/Subject';
import { AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-comment-index',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: any = {};

  dtTrigger: any = new Subject<any>();
  items: CommentGeneral[] = [];

  constructor(private renderer: Renderer2, private commentService: CommentService, private router: Router) { }

  ngOnInit(): void {
    this.loadTable();
    this.loadData();
  }

  async loadData() {
    this.commentService.getData().subscribe(data => {
      this.items = data;
      this.commentService.setData(this.items);
      this.rerender();
    });
  }

  loadTable() {
    const that = this;
    this.dtOptions = {
      serverSide: false,
      processing: true,
      ordering: true,
      searching: true,
      order: [[0, 'asc']],
      ajax: function (data: any, callback: (arg0: { data: CommentGeneral[]; }) => void, settings: any) {
        callback({
          'data': that.items
        });
      },
      language: {
        "decimal": ".",
        "emptyTable": "No hay información registrada",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
        "infoFiltered": "(filtrando de _MAX_ entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrando _MENU_ registros",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Busqueda:",
        "zeroRecords": "No hay coincidencias encontradas",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        },
        "aria": {
          "sortAscending": ": activate to sort column ascending",
          "sortDescending": ": activate to sort column descending"
        }
      },
      columns: [
        { data: 'id', title: 'ID', searchable: false, },
        { data: 'name', title: 'Nombre', responsePriority: 1 },
        { data: 'email', title: 'Correo Electrónico' },
        { data: 'website', title: 'Página Web' },
        { data: 'content', title: 'Comentarios' },
        {
          title: '', responsePriority: 0, data: 'id', render: function (text: any) {
            return '<button class="btn btn-info btn-edit-list" data-id="' + text + '" (click)="onEdit(item)">Editar</button>';
          }
        }
      ],
      rowCallback(row: any, data: any, index: any) {
      },
      drawCallback(Settings: any) {
       
      },
      preDrawCallback(Settings: any) {
      },
      responsive: true
    };
  }

  onPost() {
    this.router.navigate(['comment/create']);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    $(document).on('click','.btn-edit-list', (event) => {
      this.onEdit(event.target.dataset.id);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  onEdit(id: string | undefined) {
    this.router.navigate(['comment/edit', id]);
  }



}
