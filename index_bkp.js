/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
var count = 1;
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");
  //to listen for any event that your app is subscribed to:
  console.log("count:: ", count);
  if (count == 1) {
    count++;
    app.onAny(async (context) => {
      app.log.info("------------------------------------------------");
      const octokit = context.octokit;
      // app.log.info("context : ");
      // app.log.info(context);

      // app.log.info("Json context : ");
      // app.log.info(JSON.stringify(context));

      const workflow_reopo_owner = context.payload.installation.account.login;
      console.log("workflow_reopo_owner: ", workflow_reopo_owner);


      //Repository details which needs to be cloned
      const owner = "GitHubVeracode";
      const repo = "veracode";

      const url = `POST /repos/${owner}/${repo}/forks`;

      console.log("url: ", url);

      const response = await octokit.request(url, {
        owner: workflow_reopo_owner,
        repo: repo,
        organization: workflow_reopo_owner,
        name: repo,
        default_branch_only: true,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      console.log("response : : ", response);
      //   app.log.info("------------------------------------------------");
      //   app.log.info({ event: context.name, action: context.payload.action });
    });
  }

  // app.on("create", async (context) => {
  //   // Code was pushed to the repo, what should we do with it?
  //   app.log.info("on create : ", context);

  // });

  // app.on("issues.opened", async (context) => {
  //   const issueComment = context.issue({
  //     body: "Thanks for opening this issue!",
  //   });
  //   return context.octokit.issues.createComment(issueComment);
  // });


  // app.on("push", async (context) => {
  //   // Code was pushed to the repo, what should we do with it?
  //   app.log.info("on push : ", context);
  // });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
