import React, { useState } from 'react';
import { InfoCard, MarkdownContent } from '@backstage/core-components';
import {
  Grid,
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
  Box,
  Divider,
} from '@material-ui/core';
import NewReleases from '@material-ui/icons/NewReleases';
import { Pagination } from '@material-ui/lab';
import { useReleaseNoteContentStyles } from './styles';

type Release = {
  name: string;
  tag_name: string;
  description: string;
};

const releases = [
  {
    name: 'Release 3.0.0',
    tag_name: '3.0.0',
    description:
      '# Version 3.0.0 Release Notes \n\n## New Features \n- Added support for real-time collaboration on documents. \n- Implemented user permissions management for shared files. \n- Introduced version history for document revisions. \n\n## Enhancements \n- Improved performance with optimized WebSocket connections. \n- Enhanced security with end-to-end encryption for shared documents. \n- Updated interface with document editing features. \n\n## Bug Fixes \n- Fixed issue causing occasional loss of document changes. \n- Resolved display issues on mobile browsers. \n- Fixed broken links in the help documentation. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Added option to view document activity logs. \n- Updated terms of service and privacy policy. \n- Implemented user feedback system for gathering suggestions.',
  },
  {
    name: 'Release 2.1.2',
    tag_name: '2.1.2',
    description:
      '# Version 2.1.2 Release Notes \n\n## New Features \n- Added support for file attachments in chat messages. \n- Implemented user activity tracking for analytics. \n- Introduced keyboard shortcuts for common actions. \n\n## Enhancements \n- Improved performance with lazy loading of resources. \n- Enhanced security with automatic session expiration. \n- Updated interface with customizable themes. \n\n## Bug Fixes \n- Fixed issue causing occasional data corruption in reports. \n- Resolved display issues on Microsoft Edge browser. \n- Fixed broken links in the help documentation. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Added option to enable/disable browser notifications. \n- Updated terms of service and privacy policy. \n- Implemented user feedback system for gathering suggestions.',
  },
  {
    name: 'Release 2.1.1',
    tag_name: '2.1.1',
    description:
      '# Version 2.1.1 Release Notes \n\n## New Features \n- Added support for real-time chat within the application. \n- Implemented user profile customization options. \n- Introduced notification center for system alerts. \n\n## Enhancements \n- Improved performance with optimized client-side rendering. \n- Enhanced security with HTTPS encryption by default. \n- Updated interface with interactive data visualizations. \n\n## Bug Fixes \n- Fixed issue causing intermittent AJAX errors. \n- Resolved display issues on high-DPI displays. \n- Fixed broken links in the help documentation. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Added option to export reports in PDF format. \n- Updated terms of service and privacy policy. \n- Implemented user feedback system for gathering suggestions.',
  },
  {
    name: 'Release 2.1.0',
    tag_name: '2.1.0',
    description:
      '# Version 2.1.0 Release Notes \n\n## New Features \n- Added support for custom plugins. \n- Implemented user authentication via OAuth 2.0. \n- Introduced data import/export functionality. \n\n## Enhancements \n- Improved performance with optimized server-side caching. \n- Enhanced security with role-based access control. \n- Updated interface with drag-and-drop functionality. \n\n## Bug Fixes \n- Fixed issue causing intermittent session timeouts. \n- Resolved display issues on Safari browser. \n- Fixed broken links in the help documentation. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Added option to schedule automated backups. \n- Updated terms of service and privacy policy. \n- Implemented user feedback system for gathering suggestions.',
  },
  {
    name: 'Release 2.0.0',
    tag_name: '2.0.0',
    description:
      '# Version 2.0.0 Release Notes \n\n## New Features \n- Completely redesigned user interface. \n- Added support for multi-user collaboration. \n- Introduced advanced reporting and analytics tools. \n\n## Enhancements \n- Improved performance with optimized database queries. \n- Enhanced security with encryption for sensitive data. \n- Updated interface with responsive design. \n\n## Bug Fixes \n- Fixed issue causing occasional crashes during data synchronization. \n- Resolved display issues on Internet Explorer 11. \n- Fixed broken links in the help documentation. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Added option to customize email notifications. \n- Updated terms of service and privacy policy. \n- Implemented user feedback system for gathering suggestions.',
  },
  {
    name: 'Release 1.2.2',
    tag_name: '1.2.2',
    description:
      '# Version 1.2.2 Release Notes \n\n## New Features \n- Added support for importing data from Excel files. \n- Implemented a dashboard for data visualization. \n- Introduced collaboration features for team projects. \n\n## Enhancements \n- Improved performance for complex queries. \n- Enhanced security with two-factor authentication. \n- Updated interface with customizable widgets. \n\n## Bug Fixes \n- Fixed issue causing data loss during file uploads. \n- Resolved display issues on mobile devices. \n- Fixed broken links in the help documentation. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Added option to customize email notifications. \n- Updated terms of service and privacy policy. \n- Implemented user feedback system for gathering suggestions.',
  },
  {
    name: 'Release 1.2.1',
    tag_name: '1.2.1',
    description:
      '# Version 1.2.1 Release Notes \n\n## New Features \n- Added support for exporting data in CSV format. \n- Implemented batch processing for faster data manipulation. \n- Introduced user roles and permissions management. \n\n## Enhancements \n- Improved data validation to prevent errors. \n- Enhanced performance when handling large datasets. \n- Updated interface with more intuitive navigation. \n\n## Bug Fixes \n- Fixed issue causing incorrect calculations in certain scenarios. \n- Resolved compatibility issues with older browser versions. \n- Fixed broken links in the help documentation. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Added keyboard shortcuts for common actions. \n- Updated terms of service and privacy policy. \n- Implemented user feedback system for gathering suggestions.',
  },
  {
    name: 'Release 1.2.0',
    tag_name: '1.2.0',
    description:
      '# Version 1.2.0 Release Notes \n\n## New Features \n- Added support for dark mode theme. \n- Implemented push notifications for real-time updates. \n- Introduced in-app tutorials for new users. \n\n## Enhancements \n- Improved search functionality with advanced filters. \n- Enhanced performance on low-memory devices. \n- Updated third-party libraries to latest versions. \n\n## Bug Fixes \n- Fixed issue causing intermittent crashes during data sync. \n- Resolved UI rendering problems on high-resolution displays. \n- Fixed broken links in the help documentation. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Added keyboard shortcuts for common actions. \n- Updated terms of service and privacy policy. \n- Implemented user feedback system for gathering suggestions.',
  },
  {
    name: 'Release 1.1.1',
    tag_name: '1.1.1',
    description:
      '# Version 1.1.1 Release Notes \n\n## New Features \n- Added a new feature for improved data visualization. \n- Integrated social media sharing functionality. \n- Implemented an auto-save feature to prevent data loss. \n\n## Enhancements \n- Improved loading times for large datasets. \n- Enhanced error handling for better user feedback. \n- Updated user interface with modern design elements. \n\n## Bug Fixes \n- Fixed issue causing data corruption when importing certain file formats. \n- Resolved compatibility issues with older browser versions. \n- Fixed minor UI glitches on mobile devices. \n\n## Known Issues \n- No known issues at this time. \n\n## Miscellaneous \n- Updated documentation with additional examples and use cases. \n- Optimized codebase for better performance. \n- Added translations for several languages.',
  },
  {
    name: 'Release 1.0.0',
    tag_name: '1.0.0',
    description:
      '# Version 1.0.0 Release Notes \n\n## New Features \n- Added a revolutionary AI-powered chatbot feature that enhances user interactions. \n- Implemented a customizable theme engine allowing users to personalize their interface. \n- Introduced real-time collaboration feature for improved team productivity. \n\n## Enhancements \n- Enhanced performance by optimizing backend database queries. \n- Improved accessibility features for users with disabilities. \n- Updated user interface for a more intuitive user experience. \n\n## Bug Fixes \n- Fixed a critical security vulnerability that could potentially lead to unauthorized access. \n- Resolved issue causing app crashes on certain devices running Android 11. \n- Fixed alignment problems in the dashboard on smaller screen resolutions. \n\n## Known Issues \n- There is a known issue with the chatbot occasionally providing incorrect responses. We are actively working on a fix for this. \n\n## Miscellaneous \n- Updated documentation with comprehensive guides and tutorials. \n- Added support for additional languages including Spanish, French, and German. \n- Made various minor bug fixes and improvements.',
  },
];

export const ReleaseNotesContent = () => {
  const [selectedRelease, setSelectedRelease] = useState<Release>(releases[0]);
  const classes = useReleaseNoteContentStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        {selectedRelease && (
          <InfoCard title="Releases" noPadding>
            <MenuList className={classes.menuList}>
              {releases.map(release => {
                const isSelected =
                  selectedRelease.tag_name === release.tag_name;

                return (
                  <MenuItem
                    className={classes.menuItem}
                    selected={isSelected}
                    onClick={() => setSelectedRelease(release)}
                  >
                    <ListItemIcon
                      className={`
                      ${classes.listItemIcon} 
                      ${isSelected && classes.listItemIconSelected}`}
                    >
                      <NewReleases />
                    </ListItemIcon>
                    <Typography>{release.name}</Typography>
                  </MenuItem>
                );
              })}
            </MenuList>
            <Divider />
            <Box className={classes.boxPagination}>
              <Pagination count={10} page={1} size="small" />
            </Box>
          </InfoCard>
        )}
      </Grid>
      <Grid item xs={12} md={9}>
        {selectedRelease && (
          <InfoCard title={selectedRelease.name}>
            <MarkdownContent content={selectedRelease.description} />
          </InfoCard>
        )}
      </Grid>
    </Grid>
  );
};
