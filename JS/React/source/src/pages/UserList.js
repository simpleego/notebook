import React from "react";

const User = ({userData}) => {
    return (
        <tr>
            <td>{userData.name}</td>
            <td>{userData.email}</td>
        </tr>
    )
}

const UserList = ()=>{
    const users = [
        {email: 'hongkd@gmail.com', name: '홍길동'},
        {email: 'leess@gmail.com', name: '이승철'},
        {email: 'leeal@gmail.com', name: '이애나'},
        {email: 'kimmk@gmail.com', name: '김남길'},
    ];

    return(
        <table>
            <thead>
            <tr>
                <th>이메일</th>
                <th>이름</th>
            </tr>
            </thead>
            <tbody>
                {users.map(user=><User userData={user} />)}
            </tbody>
        </table>
    );
}

export default UserList;
