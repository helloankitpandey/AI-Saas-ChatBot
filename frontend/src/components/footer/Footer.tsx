import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <div
          style={{
            width: "100%",
            padding: 20,
            minHeight: "20vh",
            maxHeight: "30vh",
            marginTop: 60,
          }}
        >
            <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
                Built With love by{" "}
                <span>
                    <Link 
                    //   style={{ color: "white"}}
                      className='nav-link' 
                      to={""}
                    >
                      Ankit Pandey 💟
                    </Link>
                </span>
                {/* 💟 */}
            </p>
        </div>
    </footer>
  )
}

export default Footer