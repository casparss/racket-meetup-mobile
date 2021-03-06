import { Component, Input } from '@angular/core';

@Component({
  selector: 'wimbledon-scoreboard',
  template: `
    <div class="wrapper">

      <h2><ion-icon name="tennisball"></ion-icon>&nbsp; Match &nbsp;<ion-icon name="tennisball"></ion-icon></h2>

      <hr>

      <table>

        <thead>
          <tr>
            <td>Player</td>
            <td>Sets</td>
            <td>Games</td>

          </tr>
        </thead>

        <tbody>
          <tr>
            <td><div>Caspar Sambrook</div></td>
            <td><div>2</div></td>
            <td><div>5</div></td>

          </tr>

          <tr>
            <td class="vs">V</td>
          </tr>

          <tr>
            <td><div>John Smith</div></td>
            <td><div>1</div></td>
            <td><div>4</div></td>

          </tr>
        </tbody>

      </table>

      <hr>

    </div>
  `
})
export class WimbledonScoreboardCom {

}
