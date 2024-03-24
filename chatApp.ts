import inquirer from "inquirer";
import chalk from "chalk";

//interface
interface Chating {
  sender: string;
  content: string;
  time: Date;
}
//class
class ChatApp {
  private user: string[];
  private messages: Chating[];

  constructor() {
    this.user = [];
    this.messages = [];
  }

  //start function
  public async start(): Promise<void> {
    console.log(chalk.cyanBright.bold("Wellcome to command line chat App \n"));
    await this.getUserName();
    await this.listForMessage();
  }
  //get user name function
  private async getUserName(): Promise<void> {
    const answer = await inquirer.prompt({
      name: "userName",
      type: "input",
      message: chalk.yellow.bold("Enter your name"),
    });
    const userName = answer.userName;
    this.user.push(userName);
  }

  //list for msgs
  private async listForMessage(): Promise<void> {
    let exit = false;
    do {
      const msgList = await inquirer.prompt({
        name: "action",
        type: "list",
        message: chalk.yellow.bold("choose an action:"),
        choices: ["Type mesage", "View message history", "Delete", "Exit"],
      });
      switch (msgList.action) {
        case "Type mesage":
          await this.typeMsg();
          break;

        case "View message history":
          await this.displayMsg();
          break;

        case "Delete":
          await this.deleteMsg();
          break;

        case "Exit":
          exit = true;
          console.log(chalk.cyanBright.bold("Good bye Take care of you! (:"));

          break;
        default:
          break;
      }
    } while (!exit);
  }
  //type msg function
  private async typeMsg(): Promise<void> {
    const msg = await inquirer.prompt({
      name: "message",
      type: "input",
      message: chalk.yellow.bold("Type your message (press Enter to send:"),
    });

    const message: Chating = {
      sender: this.user[0],
      content: msg.message,
      time: new Date(),
    };
    this.messages.push(message);
    console.log(chalk.green.bold("Message sent successfully!"));
  }

  // display msg function
  private async displayMsg(): Promise<void> {
    console.clear();
    console.log(chalk.blueBright.bold("Chat History:\n"));
    this.messages.forEach((message, index) => {
      console.log(
        chalk.magentaBright.bold(
          `[${index + 1}] [${message.time.toLocaleTimeString()}] ${
            message.sender
          } : ${message.content} `
        )
      );
    });
  } 
  //delete msg function
  private async deleteMsg(): Promise<void> {
    const answer = await inquirer.prompt({
      name: "action",
      type: "input",
      message: chalk.yellow.bold(
        "Enter the index of the message you want to delete:"
      ),
    });

    const deletemsgs = parseInt(answer.action);
    if (
      !isNaN(deletemsgs) &&
      deletemsgs > 0 &&
      deletemsgs <= this.messages.length
    ) {
      this.messages.splice(deletemsgs - 1, 1);
      console.log(chalk.green.bold("Message deleted successfully!"));
    } else {
      console.log(chalk.red.bold("Invalid index! Please enter a valid index."));
    }
  }
}
//instance of the class
const chatApp = new ChatApp();
chatApp.start();
