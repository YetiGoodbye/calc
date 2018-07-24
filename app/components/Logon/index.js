import React from 'react';

const Logon = (props) => {
  return (
    <form>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Username</label>
            </td>
            <td>
              <input type='text'/>
            </td>
          </tr>
          <tr>
            <td>
              <label>Password</label>
            </td>
            <td>
              <input type='password'/>
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <button>Log in</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default Logon;
