import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';

function Deck() {

    const [deckData, setDeckData] = useState(null)
    const [id, setId]=useState(0);
    const [src, setSrc] = useState(null)
    const ref = useRef(null)

  console.log(src, 'src')

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    };

    useEffect(() => {
        async function getDeckId(){
          let response = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`);
          return response.data.deck_id;
        }
 
        async function getDeckData(id){
          let response = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=6`);
          shuffle(response.data.cards)
          setDeckData(response.data);
        }
      getDeckId().then(deckId => {
        getDeckData(deckId);
      });
  
    }, []);
   
  function handleData(){
      setId((prev)=>prev + 1);
    setSrc(deckData.cards[`${id}`].image)


  }


  return (

    <div className="container">
    {
        deckData && id < deckData.cards.length 
        ? (
            <React.Fragment>
                <button onClick={handleData} ref={ref} className='btn btn-lg btn-secondary mt-5 fw-bold'>
                    GIMME A CARD
                </button>
                <div className="mt-4">
                    <img className='mt-4' src={src} alt="Card" />
                </div>
            </React.Fragment>
        ) 
        : (
            <h1 className='text-white fw-bold mt-5'>Error: no cards remaining!</h1>
        )
    }
</div>

  )
}

export default Deck