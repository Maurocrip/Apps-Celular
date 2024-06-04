import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/servicios/global.service';
import * as echarts from 'echarts';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { Router } from '@angular/router';
type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage  implements OnInit{

  public grafico : number = 0;
  platform: any;

  constructor(public global: GlobalService, private firebase :FirebaseService, private router: Router) { }
  ngOnInit(): void 
  {
    Swal.fire({
      title: "Que grafico deseas ver?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Cosas lindas",
      denyButtonText: `Cosas Feas`,
      cancelButtonText: 'Ir al home',
      heightAuto: false
    }).then((result) => 
    {
      if (result.isConfirmed) 
      {
        this.grafico = 1;
      } else if (result.isDenied) 
      {
        this.grafico = 2;
      } else
      {
        this.router.navigate(['home']);
      }

      this.firebase.getAllSnapshot("feas","Day","Hora","desc").subscribe(()=>
      {
        this.GenerarGraficoFeas();
      })

      this.firebase.getAllSnapshot("lindas","Day","Hora","desc").subscribe(()=>
      {
        this.GenerarGraficoLindas();
      })
    });
  }

  private GenerarGraficoLindas()
  {
    let chartDom = document.getElementById('GraficoLindas')!;
    let myChart = echarts.init(chartDom);
    let option: echarts.EChartsOption;
    let arrayOpciones : Array<any> = [];
    let valor : number;

    for(let foto of this.global.arrayFotosLindas)
    {
      valor = 0;
      for(let voto of foto.Votos)
      {
        if(voto.valor)
        {
          valor ++;
        }
      }
      arrayOpciones.push({value: valor, name: foto.Usuario + "." + foto.Day + "." + foto.Hora, path: foto.Path})
    }

    option = {
      tooltip: {
        trigger: 'none',
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'left'
      },
        grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            containLabel: true
        },
      series: [
        {
          name: 'Vostos',
          type: 'pie',
          radius: '50%',
          data: arrayOpciones,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    
    option && myChart.setOption(option);
    myChart.on('click', 'series', function(e)
    {
      let objet : any = e.data;
      let nombre = objet.name.split(".")
      let texto = "Foto subida por " + nombre[0] + " el dia " + nombre [1] + " a las" + nombre[2] + " con " + objet.value + " votos";

      Swal.fire({
        text: texto,
        imageUrl: objet.path,
        imageHeight: 200,
        imageWidth: 200,
        heightAuto: false
      });
    });
  }

  private GenerarGraficoFeas()
  {
    let chartDom = document.getElementById('GraficoFeas')!;
    let myChart = echarts.init(chartDom);
    let option: echarts.EChartsOption;
    let arrayNombres : Array<any> = [];
    let arrayLikes : Array<any> = [];
    let valor : number;

    for(let foto  of this.global.arrayFotosFeas)
    {
      valor = 0;
      for(let voto of foto.Votos)
      {
        if(voto.valor)
          {
            valor ++;
          }
      }
      arrayNombres.push( foto.Usuario + "." + foto.Day + "." + foto.Hora)
      arrayLikes.push({value: valor, path: foto.Path})
    }

    option = {

      grid: {
        top: 20,
        bottom: 30
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        data: arrayNombres
      },
      series: [
        {
          name: 'votos',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            formatter: '{b}'
          },
          data: arrayLikes
        }
      ]
    };
    
    option && myChart.setOption(option);
    myChart.on('click', 'series', function(e)
    {
      let objet : any = e.data;
      let nombre = e.name.split(".")
      let texto = "Foto subida por " + nombre[0] + " El dia: " + nombre [1] + " a las" + nombre[2] + " con " + objet.value + " votos";

      Swal.fire({
        text: texto,
        imageUrl: objet.path,
        imageHeight: 200,
        imageWidth: 200,
        heightAuto: false
      });
    });
  
  }

  Cambiar()
  {
    if(this.grafico==1)
    {
      this.grafico = 2;
      setTimeout(() => 
      {
        this.GenerarGraficoFeas();
      }, 1);
    }
    else
    {
      this.grafico = 1;
      setTimeout(() => 
      {
        this.GenerarGraficoLindas();
      }, 1);
    }
  }

}
