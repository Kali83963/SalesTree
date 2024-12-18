import './TopBox.css';
function TopBox({topDealUsers}) {
    
    
  return (
    <div className="topBox">
        <h1>Top Deals</h1>
        <div className="list">
            {topDealUsers.map(user => (
                <div className="listItem" key={user.id}>
                    <div className="user">
                        <img className="user-image" src={user.img} alt={user.username} />
                        <div className="userTexts">
                            <span className="username">{user.username}</span>
                            <span className="email">{user.email}</span>

                        </div>
                    </div>
                    <span className="amount">${user.amount}</span>
                </div>

            ))}

        </div>
    </div>
  )
}

export default TopBox