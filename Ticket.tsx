import './estilos.css'
import './nuevoEstilos.css'
import { BsPlus } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlineRemove } from "react-icons/md";
import { Bs1CircleFill, Bs2Circle, Bs3Circle } from "react-icons/bs";
import { CiCirclePlus, CiCircleMinus  } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {ChangeEvent, useState} from 'react';
import Input from '../componentesjesus/input';
import CustomDropdown from './CustomDropdown';
import { nuevoAlmacen, nuevoticket } from '../interfaces/InterfacesAlmacen';
const Ticket = () => {  
const [itemShow, ] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
  setCurrentPage(1); 
  }
  const [valueSelect, setValueSelect] = useState<keyof nuevoticket>('producto')
  const [producto, setProducto] = useState('');
  const [datosAlmacen, setDatosAlmacen] = useState<nuevoAlmacen[]>([]);
  const [datosTicket, setDatosTicket] = useState<nuevoticket[]>([]);
  const [stock, setStock] = useState('');
  const [codigo, setCodigo] = useState('');
  const [datosActualizados, setDatosActualizados] = useState<nuevoticket[]>([]);
  const [guardarTicket, setGuardarTicket] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const filteredProducts = datosTicket.filter((producto) => {
    return producto[valueSelect]?.toString()?.toLowerCase()?.includes(searchTerm.toLowerCase());
    }
    );
    const indexOfLastItem = currentPage * itemShow;
    const indexOfFirstItem = indexOfLastItem - itemShow;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const handleProducto = () => {
      if(!producto || !stock || !codigo) {
        alert('No completó todos los campos, inténtelo de nuevo');
          return;
      }
      const nuevoticket = {
        cantidad:'1',
        producto,
        stock,
        codigo,
      };
      setDatosTicket([...datosTicket, nuevoticket]);
      setDatosActualizados([...datosActualizados, nuevoticket]);
      setProducto('');
      setStock('');
      setCodigo('');
    }
    const eliminarproducto = (index: number) =>{
      const newDate = [...datosTicket];
      newDate.splice(index, 1);
      setDatosTicket(newDate)
    }
/* -------------------------------------------------------------------------------------------------------------------------- */
  const ordenarCajeroAlfabeticamente = () => {
    const productosOrdenados = [...datosAlmacen].sort((a, b) => {
      const nombreA = a.cajero.toUpperCase();
      const nombreB = b.cajero.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    setDatosAlmacen(productosOrdenados);
  };
  const ordenarClientesAlfabeticamente = () => {
    const productosOrdenados = [...datosAlmacen].sort((a, b) => {
      const nombreA = a.cliente.toUpperCase();
      const nombreB = b.cliente.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    setDatosAlmacen(productosOrdenados);
  };
  const optionsCajeros = [
    {
      label:"Alfabeticamente",
      onClick: ordenarCajeroAlfabeticamente
    },
  ]
  const optionsClientes = [
    {
      label:"Alfabeticamente",
      onClick: ordenarClientesAlfabeticamente
    },
  ]
  const handleCheckboxChange = (index: number) => {
    const selectedIndex = selectedItems.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, index]);
    } else {
      const updatedSelection = [...selectedItems];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedItems(updatedSelection);
    }
  };
  const aumentarCantidad = (index: number) => {
    const nuevosDatosTicket = [...datosTicket]; // Crear una copia del estado actual de datosTicket
    const item = nuevosDatosTicket[index]; // Obtener el elemento correspondiente al índice dado
    const stock = parseInt(item.stock); // Obtener el stock del artículo como un número
    let nuevaCantidad = parseInt(item.cantidad) + 1; // Aumentar la cantidad en uno
    // Verificar si la nueva cantidad excede el stock máximo, si es así, limitarla al stock máximo
    nuevaCantidad = Math.min(nuevaCantidad, stock);
    nuevosDatosTicket[index] = { ...item, cantidad: nuevaCantidad.toString() }; // Actualizar la cantidad en la copia
    setDatosTicket(nuevosDatosTicket); // Actualizar el estado de datosTicket con la nueva copia
  };
  
  const disminuirCantidad = (index: number) => {
    const nuevosDatosTicket = [...datosTicket]; // Crear una copia del estado actual de datosTicket
    const item = nuevosDatosTicket[index]; // Obtener el elemento correspondiente al índice dado
    let nuevaCantidad = parseInt(item.cantidad) - 1; // Disminuir la cantidad en uno
    // Verificar si la nueva cantidad es menor que 1, si es así, limitarla a 1
    nuevaCantidad = Math.max(nuevaCantidad, 1);
    nuevosDatosTicket[index] = { ...item, cantidad: nuevaCantidad.toString() }; // Actualizar la cantidad en la copia
    setDatosTicket(nuevosDatosTicket); // Actualizar el estado de datosTicket con la nueva copia
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let newValue = parseInt(e.target.value);
    const maxStock = parseInt(datosTicket[index].stock); // Obtener el stock máximo del artículo actual
    // Limitar el valor dentro del rango de 0 al stock máximo
    newValue = Math.max(1, Math.min(newValue, maxStock));
    // Actualizar el estado
    const updatedItems = [...datosTicket];
    updatedItems[index].cantidad = newValue.toString();
    setDatosTicket(updatedItems);
  };
  const gestionarTicket = () => {
    if (guardarTicket) {
      const nuevosDatosTicket = datosTicket.map((item, index) => {
        if (selectedItems.includes(index)) {
          return { ...item, cantidad: '1' };
        }
        return item;
      });
      setDatosTicket(nuevosDatosTicket);
      setGuardarTicket(false);
    } else {
      setGuardarTicket(true);
      const updatedTicket = [...datosTicket];
      selectedItems.forEach((index) => {
        const item = updatedTicket[index];
        const stockNum = parseInt(item.stock);
        updatedTicket[index] = {
          ...item,
          cantidad: stockNum.toString(),
        };
      });
      setDatosTicket(updatedTicket);
    }
  };
  return (
    <>
      <div className="bg-white p-3 ">
        <div  className="bg-gray-200 p-2 mb-2">
          <div>
            <div className={ ' flex space-x-2 gap-3 mb-2'}>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-yellow-300">
              Back
              </button>
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-300">
              <BsPlus/>
              </button>
              <div style={{textAlign:'center', justifyContent:'center'}}>
              <div style={{display:'flex', textAlign:'center', justifyContent:'center'}}>
              <div><Bs1CircleFill style={{color:'#2f5e89', fontSize:'25px'}}/>
              <p>paso</p></div>
              <p><FaRegCircle style={{fontSize:'10px'}}/></p>
              <p><FaRegCircle style={{fontSize:'10px'}}/></p>
              <p><FaRegCircle style={{fontSize:'10px'}}/></p>
              <div><Bs2Circle style={{fontSize:'25px'}}/>
              <p>paso</p></div>
              <p><FaRegCircle style={{fontSize:'10px'}}/></p>
              <p><FaRegCircle style={{fontSize:'10px'}}/></p>
              <p><FaRegCircle style={{fontSize:'10px'}}/></p>
              <div><Bs3Circle style={{fontSize:'25px'}}/>
              <p>paso</p></div></div>
              </div>
              
              {/* <div className='izquierdas'>
                <select onChange={(e)=> setValueSelect(e.target.value as keyof nuevoticket)}>
                <option>Buscar por</option>
                <option value='producto'>Producto</option>
                <option value='codigo'>Codigo</option>
                </select>
              </div>
              <div className='izquierda'>
              <Input onChange={onSearch} placeholder='Buscar'/>
              </div> */}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="relative w-full ProductsOver" >
            <table className="w-full caption-bottom text-sm">
              <thead  className="[&_tr]:border-b bg-pos thead-sticky bg-pos">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    <CustomDropdown title='Imagen'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
                    <CustomDropdown title='Cantidad' options={optionsCajeros}/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
                    <CustomDropdown title='Producto' options={optionsClientes}/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
                    <CustomDropdown title='Código de Barra'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 ">
              {currentItems.map ((item,index) =>(
                <tr>
                  <td style={{ textAlign: 'center' }}>insertar imagen</td>
                  <td style={{ textAlign: 'center' }}>
                    <button style={{backgroundColor:'white', border: 'none', padding: 0}}><CiCirclePlus onClick={() => aumentarCantidad(index)} style={{fontSize:'25px'}}/></button>
                    <Input style={{textAlign:'center'}} className='w-50' value={item.cantidad} onChange={(e) => handleInputChange(e, index)}  id={`input-${index}`}  key={index} />
                    <button style={{backgroundColor:'white', border: 'none', padding: 0}}><CiCircleMinus onClick={() => disminuirCantidad(index)} style={{fontSize:'25px'}}/></button>
                  </td>
                  <td style={{ textAlign: 'center' }}> <strong>{item.producto}</strong> <p className='letrass' >En stock {Number(item.stock) - Number (item.cantidad)}</p></td>
                  <td style={{ textAlign: 'center' }}>{item.codigo}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => eliminarproducto(index)} className="rojo inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><MdDelete /></button>{' '}
                    <input type="checkbox" onChange={() => handleCheckboxChange(index)}/>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div  className="bg-gray-200 p-2 mb-2">
          <div>
            <div className={ ' flex space-x-2 gap-3 mb-2'}>
            <button
              onClick={gestionarTicket}
              disabled={selectedItems.length === 0} // Deshabilitar el botón si no hay elementos seleccionados
              style={{ backgroundColor: guardarTicket ? 'red' : 'green' }}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-300"
            >
              {guardarTicket ? <GrPowerReset /> : 'Stock'}
            </button>
              <div className='izquierda'>
              <button data-bs-toggle="modal" data-bs-target="#exampleModali" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-300">
              Siguiente
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo Almacén</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Producto</p><Input value={producto} onChange={(e) => setProducto(e.target.value)}/>
              <p>Stock</p><Input value={stock} onChange={(e) => setStock(e.target.value)}/>
              <p>Codigo de Barra</p><Input value={codigo} onChange={(e) => setCodigo(e.target.value)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleProducto}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div className="modal fade" id="exampleModali" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-gray-200">
              <h3>
                Generar etiquetas
              </h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div  >
          <div>
            <div>
              <div style={{display:'flex', textAlign:'center', justifyContent:'center'}}>
              <Bs1CircleFill style={{color:'#2f5e89', fontSize:'40px'}}/>_____<Bs2Circle style={{fontSize:'40px'}}/>_____<Bs3Circle style={{fontSize:'40px'}}/>
              </div>
              <div style={{display:'flex', textAlign:'center', justifyContent:'center'}}>
              <div>
              <p className='mar'>paso 1</p>
              </div>
              <div>
              <p className='mar'>paso 2</p>
              </div>
              <div>
              <p className='mar'>paso 3</p>
              </div>
              </div>
             
              
              {/* <div className='izquierdas'>
                <select onChange={(e)=> setValueSelect(e.target.value as keyof nuevoticket)}>
                <option>Buscar por</option>
                <option value='producto'>Producto</option>
                <option value='codigo'>Codigo</option>
                </select>
              </div>
              <div className='izquierda'>
              <Input onChange={onSearch} placeholder='Buscar'/>
              </div> */}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="relative w-full ProductsOver" >
            <table className="w-full caption-bottom text-sm">
              <thead  className="[&_tr]:border-b bg-pos thead-sticky bg-pos">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    <CustomDropdown title='Imagen'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
                    <CustomDropdown title='Cantidad' options={optionsCajeros}/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
                    <CustomDropdown title='Producto' options={optionsClientes}/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
                    <CustomDropdown title='Código de Barra'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 ">
              {currentItems.map ((item,index) =>(
                <tr>
                  <td style={{ textAlign: 'center' }}>insertar imagen</td>
                  <td style={{ textAlign: 'center' }}>
                    <button style={{backgroundColor:'white', border: 'none', padding: 0}}><CiCirclePlus onClick={() => aumentarCantidad(index)} style={{fontSize:'25px'}}/></button>
                    <Input style={{textAlign:'center'}} className='w-50' value={item.cantidad} onChange={(e) => handleInputChange(e, index)}  id={`input-${index}`}  key={index} />
                    <button style={{backgroundColor:'white', border: 'none', padding: 0}}><CiCircleMinus onClick={() => disminuirCantidad(index)} style={{fontSize:'25px'}}/></button>
                  </td>
                  <td style={{ textAlign: 'center' }}> <strong>{item.producto}</strong> <p className='letrass' >En stock {Number(item.stock) - Number (item.cantidad)}</p></td>
                  <td style={{ textAlign: 'center' }}>{item.codigo}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => eliminarproducto(index)} className="rojo inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><MdDelete /></button>{' '}
                    <input type="checkbox" onChange={() => handleCheckboxChange(index)}/>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
            </div>
            <div className="modal-footer">
                <button className=' btn-danger rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 bg-blue-300"'> Cerrar </button>
                <button
                  onClick={gestionarTicket}
                  disabled={selectedItems.length === 0} // Deshabilitar el botón si no hay elementos seleccionados
                  style={{ backgroundColor: guardarTicket ? 'gold' : 'green' }}
                  className=" rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 bg-blue-300"
                >
                  {guardarTicket ? <GrPowerReset /> : 'Stock'}
                </button>
                  <button data-bs-toggle="modal" data-bs-target="#exampleModali" className="float-end inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-300">
                  Siguiente
                  </button>
            </div>
          </div>
        </div>
      </div>
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    </>
  )
}
export default Ticket