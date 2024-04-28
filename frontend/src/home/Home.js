import './Home.css'
import '../webapp_footer/footer.css'

import HeadNav from '../reusable/header/HeadNav'

import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home(){

    const [fooditems,setfooditems] = useState([]) 

    async function getfood(){
        const res = await axios.get('http://localhost:5000/fooditems')
        return res.data
    }

    async function setfood(){
        if(fooditems.length===0){
        const res = await getfood()
        setfooditems(res)
    }
    }

    setTimeout(setfood,100)

    return(
        <div>
            <HeadNav/>
            <div className='mainbody'>
                <div className='maincontainer'>
                    <div className='incontainer'>
                        <div className='Webapp_Footer'>
                            <div className='left'>
                                <h1>Food Details</h1>
                            </div>
                            <div className='right' style={{marginBottom:"10px"}}>
                                <input className='Homeright' style={{marginRight:"5px"}} type='text'/>
                                <Link to="/addfood"><button className='Homeright'>+ Add Food</button></Link>
                            </div>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Item</th>
                                    <th>Food ID</th>
                                    <th>Quantity</th>
                                    <th>Food Genre</th>
                                    <th>Action</th>
                                </tr>
                                {fooditems.map((fitem) => 
                                    <tr key={fitem.foodId}>
                                    <td>{fitem.item}</td>
                                    <td>{fitem.foodId}</td>
                                    <td>{fitem.quantity}</td>
                                    <td>{fitem.foodGenre}</td>
                                    <td>
                                        <i className="fa-solid fa-eye"></i>
                                        <i style={{marginLeft:'5%'}} className="fa-solid fa-pen-to-square"></i>
                                    </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>   
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default Home