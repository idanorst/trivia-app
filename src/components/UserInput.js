import '../style.css'
import Blob5 from '../images/blob5.png'
import Blobs from '../images/blobs.png'
import Dropdown from './Dropdown.js'

export default function UserInput(props) {
    // Rendering out the settings page where the user can choose the category and the difficulty of the quiz. 
    return (
        <div className="settings-page">
            <img className='blob-right' alt="yellow-figure" src={Blob5} />
            <div className='settings-page--container'>
                <h1 className="settings-page--title">User settings</h1>
                <div className='dropdown-box'>
                    <p className="settings-page--text">Choose category: </p>
                    {/* Dropdowns are used to let the player choose category */}
                    <Dropdown 
                        placeHolder="Select..." options={props.categoryChoices}
                        onChange={(value) => props.registerCategory(value)}/>
                </div>
                <div className='dropdown-box'>
                    <p className="settings-page--text">Choose difficulty: </p>
                    {/* and difficulty, which is send as props to the quiz page. */}
                    <Dropdown 
                        placeHolder="Select..." options={props.difficultyChoices}
                        onChange={(value) => props.registerDifficulty(value)}/>
                </div>
                <button className='start-page--btn' onClick={props.handleClick}>Start quiz</button>
            </div>
            
            <img className='blob-left' alt="blue-figure" src={Blobs} />
        </div>
    )
}