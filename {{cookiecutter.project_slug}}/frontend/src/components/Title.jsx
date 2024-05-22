import crag from '../assets/crag.png'
import '../index.css'

export default function Title() {
    return (
    <div className='title justify-center'>
        <h1 className="text-3xl"> Meet,</h1>
        <img className="title-img" src={crag} alt="Crag Logo"></img>
    </div>
    );
  }