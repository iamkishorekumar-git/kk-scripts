
_Rclone is a command-line tool used for syncing files and directories between various cloud storage services_

Configure Rclone and set up your AWS S3 credentials

```bash
rclone config
```

**Upload Objects from Local**

```bash
rclone copy --progress ~/Videos/myvideo.mp4 <remoteName>:<BucketName>/videos
```

### Sync - Local changes to remote

```bash
rclone sync local_directory remote_name:path/to/remote_directory
```

```bash
rclone sync --log-level=DEBUG Passwords.kdbx manager:kk-manager/keys
```
