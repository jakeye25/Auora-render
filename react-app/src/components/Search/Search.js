import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { thunkGetAllQuestion } from '../../store/question';
import './Search.css'
import { thunkGetAllQuestionAnswer } from '../../store/answer';
import { thunkGetAllTopic } from '../../store/topic';

function Searchbar() {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.question)
    const answers = useSelector((state) => state.answer)
    const topics= useSelector((state) => state.topic)

    const questionsArr = Object.values(questions)
    const answersArr = Object.values(answers)
    const topicsArr = Object.values(topics)

    // console.log('qquestionarr', questionsArr)
    // console.log('aarr', answersArr)
    // console.log('topicarr', topicsArr)

    const [searchWord, setSearchWord] = useState('')
    const [showDropdown, setShowDropdown] = useState(false);
    const[searchResult, setSearchResult] =useState([]);

    const results = (word) =>{
        const str1 =[];
        const str2=[]
        for (let i =0; i<questionsArr.length; i++){
          let question = questionsArr[i];
          if (question.questioncontent.toLowerCase().startsWith(word.toLowerCase())
          ){
            str1.push(question)
          }
        }
        for (let i =0; i<topicsArr.length; i++){
            let topic = topicsArr[i];
            if (topic.name.toLowerCase().startsWith(word.toLowerCase())
            ){
              str2.push(topic)
            }
          }
          let str3 = str1.slice(0,3).concat(str2.slice(0,2))
        return str3
    }

    useEffect(() => {
        if (searchWord.length) {
            setShowDropdown(true)
            setSearchResult(results(searchWord))
        } else {
            setShowDropdown(false)
            setSearchResult([])
        }
    }, [searchWord])

    useEffect(() => {
        dispatch(thunkGetAllQuestion())
        dispatch(thunkGetAllTopic())
        // dispatch(thunkGetAllQuestionAnswer())
    }, [dispatch])

    useEffect(()=>{

    }, [questionsArr, topicsArr])

    return(
        <>
            <div className='searchbar'>
                <div className='search_btn'><i className="fa-solid fa-magnifying-glass"></i> &nbsp;</div>
                <input
                type='text'
                className='searchinput'
                placeholder='Search Auora'
                onChange={(e) => setSearchWord(e.target.value)}
                value={searchWord}
                />
            </div>
            {(showDropdown && searchResult.length >0) && (
                <div className='search_dropdown'>
                    { searchResult.map((ele) => (
                         ele?.name ? (
                            <NavLink className='dropdowm-item' to={`/topics/${ele?.name}`} onClick={() => setSearchWord("")}>Topic: {ele?.name}</NavLink>) :
                        (<NavLink className='dropdowm-item' to={`/questions/${ele?.id}`} onClick={() => setSearchWord("")}>
                            {ele?.questioncontent}
                        </NavLink>)
                    ))

                    }
                </div>
            )}

            {(showDropdown && !searchResult.length) && (
                <div className='search_dropdown'>
                    <div className='searchnotfound'>We couldn't find any results for "{searchWord}"</div>
                </div>
            )}
        </>
    )


}

export default Searchbar
