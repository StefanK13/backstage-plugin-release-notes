import { HomePageLayoutBlueprint } from '@backstage/plugin-home-react/alpha';
import { Content, Page } from '@backstage/core-components';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import {
  HomePageCompanyLogo,
  HomePageStarredEntities,
  TemplateBackstageLogo,
} from '@backstage/plugin-home';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { SearchContextProvider } from '@backstage/plugin-search-react';
import { Grid, makeStyles } from '@material-ui/core';
import { ReleaseNotesCard } from '@stefank13/backstage-plugin-release-notes';

const useStyles = makeStyles(theme => ({
  searchBarInput: {
    maxWidth: '60vw',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50px',
    boxShadow: theme.shadows[1],
  },
  searchBarOutline: {
    borderStyle: 'none',
  },
}));

const useLogoStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(5, 0),
  },
  svg: {
    width: 'auto',
    height: 100,
  },
  path: {
    fill: '#7df3e1',
  },
}));

export const myHomePageLayout = HomePageLayoutBlueprint.make({
  params: {
    loader: async () =>
      function MyHomePageLayout() {
        const classes = useStyles();
        const { svg, path, container } = useLogoStyles();

        return (
          <SearchContextProvider>
            <Page themeId="home">
              <Content>
                <Grid container justifyContent="center" spacing={6}>
                  <HomePageCompanyLogo
                    className={container}
                    logo={<TemplateBackstageLogo classes={{ svg, path }} />}
                  />
                  <Grid container item xs={12} justifyContent="center">
                    <HomePageSearchBar
                      InputProps={{
                        classes: {
                          root: classes.searchBarInput,
                          notchedOutline: classes.searchBarOutline,
                        },
                      }}
                      placeholder="Search"
                    />
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={12} md={6}>
                      <ReleaseNotesCard
                        projectSlug="vodafoneziggodi/cockpit/cockpit"
                        title="Backstage Instance Releases"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <HomePageStarredEntities />
                    </Grid>
                  </Grid>
                </Grid>
              </Content>
            </Page>
          </SearchContextProvider>
        );
      },
  },
});

export const homeModule = createFrontendModule({
  pluginId: 'home',
  extensions: [myHomePageLayout],
});
