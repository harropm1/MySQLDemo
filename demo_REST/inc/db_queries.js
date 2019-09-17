function executeQuery(conn, res, qryStr)
{
    return conn.query(qryStr, function (err, rows)
    {
        //console.log('executing query:\n' + qryStr);
        if (err)
        {
            console.log('Error while performing Query.');
            console.log('Executing Query:\n' + qryStr);
            conn.end();

            if (err.toString().indexOf('ER_DUP_ENTRY'))
            {
                res.json({
                    'success': false,
                    'msg': 'Error executing query.',
                    'err_code': 'ER_DUP_ENTRY'
                });
            } 
            else
            {
                res.json({
                    'success': false,
                    'msg': 'Error executing query.'
                });
            }
        }
        //console.log(rows);
        conn.end();
        res.json(rows);
    });
}

module.exports = {
    getAllUsers: function (conn, req, res)
    {
        if (conn)
        {
            var userName = req.body.user_name;
            var userPassword = req.body.user_password;
            var qryStr = 'SELECT * FROM user';
            executeQuery(conn, res, qryStr);
        } 
        else
        {
            res.json({
                'success': false,
                'msg': 'No DB Connection established.'
            });
        }
    },
    postUserRegister: function (conn, req, res)
    {
        if (conn)
        {
            var userName = req.body.user_name;
            var userPassword = req.body.user_password;
            var userEmail = req.body.user_email;
            var qryStr = 'INSERT into user (user_name, email, password) values("' + userName + '", "' + userPassword + '", "' + userEmail + '")';
            executeQuery(conn, res, qryStr);
        } 
        else
        {
            res.json({
                'success': false,
                'msg': 'No DB Connection established.'
            });
        }
    },
    postUserLogin: function (conn, req, res)
    {
        if (conn)
        {
            var userName = req.body.user_name;
            var userPassword = req.body.user_password;
            var userEmail = req.body.user_email;
            var qryStr = 'SELECT * FROM user WHERE user_name = "' + userName + '" and email = "' + userEmail + '" and password = "' + userPassword + '"';
            executeQuery(conn, res, qryStr);
        } 
        else
        {
            res.json({
                'success': false,
                'msg': 'No DB Connection established.'
            });
        }
    },
    putUserPasswordUpdate: function (conn, req, res)
    {
        if (conn)
        {
            var userName = req.body.user_name;
            var userPassword = req.body.user_password;
            var qryStr = 'UPDATE user SET password = "' + userPassword + '" WHERE user_name = "' + userName + '"';
            executeQuery(conn, res, qryStr);
        } else
        {
            res.json({
                'success': false,
                'msg': 'No DB Connection established.'
            });
        }
    },
    putUserEmailUpdate: function (conn, req, res)
    {
        if (conn)
        {
            var userName = req.body.user_name;
            var userEmail = req.body.user_email;
            var qryStr = 'UPDATE user SET email = "' + userEmail + '" WHERE user_name = "' + userName + '"';
            executeQuery(conn, res, qryStr);
        } 
        else
        {
            res.json({
                'success': false,
                'msg': 'No DB Connection established.'
            });
        }
    },
    putUserTotalUpdate: function (conn, req, res)
    {
        if (conn) 
        {
            var userName = req.body.user_name;
            var userPassword = req.body.user_password;
            var userEmail = req.body.user_email;
            var qryStr = `UPDATE user SET email = "${userEmail}", password = "${userPassword}" WHERE user_name = "${userName}"`;
            executeQuery(conn, res, qryStr);
        } 
        else
        {
            res.json({
                'success': false,
                'msg': 'No DB Connection established.'
            });
        }
    },

    putOneOrTheOther: function(conn, req, res)
    {
        if (conn)
        {
            var userId = req.params.user_id;
            var updateType = req.body.update_type;
            var updateValue = req.body.update_value;
            var qryStr = `UPDATE user SET ${updateType} = "${updateValue}" WHERE id = ${userId}`;
            console.log(qryStr);
            executeQuery(conn, res, qryStr);
        }
        else
        {
            res.json({
                'success': false,
                'msg': 'No DB Connection established.'
            });
        }
    },
    deleteUser: function (conn, req, res)
    {
        if (conn)
        {
            var userId = req.params.user_id;
            var qryStr = 'DELETE FROM user WHERE id = ' + userId;
            executeQuery(conn, res, qryStr);
        } else
        {
            res.json({
                'success': false,
                'msg': 'No DB Connection established.'
            });
        }
    }
};