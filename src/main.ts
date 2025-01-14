import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("repo-token", { required: true });
    const tag = core.getInput("tag", { required: true });
    const sha =
      core.getInput("commit-sha", { required: false }) || github.context.sha;
    const repo = core.getInput("repo", { required: true });

    const client = new github.GitHub(token);

    core.debug(`tagging #${sha} with tag ${tag}`);
    await client.git.createRef({
      owner: github.context.repo.owner,
      repo: `${repo}`,
      ref: `refs/tags/${tag}`,
      sha: sha
    });
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

run();
