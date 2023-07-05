module.exports = (app) => {
  app.log.info(">-----------> Veracode Probot App <-----------<");
  // app.onAny(async (context) => {
  app.on('installation.created', async context => {
    const octokit = context.octokit;
    const user_account_name = context.payload.installation.account.login;
    app.log.info(`App installed successfully on ${user_account_name}`);
    
    //Repository details which needs to be cloned
    const owner = "GitHubVeracode";
    const repo = "veracode";
    app.log.info(`Cloning ${repo} from ${owner} under ${user_account_name} Github account.`);
    const url = `POST /repos/${owner}/${repo}/forks`;
    const response = await octokit.request(url, {
      owner: user_account_name,
      repo: repo,
      organization: user_account_name,
      name: repo,
      default_branch_only: true,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
  });
};