# 2: Installation

## 2.2: Vérification de l’installation
<br>
commande

```bash
docker --version
```
<br>
réponse

```bash
Docker version 27.2.0, build 3ab4256958
```
---
<br>
commande

```bash
sudo docker run hello-world
```
---
<br>
commande

```bash
sudo docker ps -a
```

<br>
réponse

<br>


| CONTAINER ID | IMAGE       | COMMAND  | CREATED           | STATUS                 | PORTS | NAMES            |
|--------------|-------------|----------|-------------------|------------------------|-------|------------------|
| 649a271af8fb | hello-world | "/hello" | About a minute ago | Exited (0) 

<br><br>

# 3: Premiers pas avec Docker

## 3.1: Images Docker

### 3.1.1: Lister les images disponibles

<br>
commande

```bash
sudo docker images
```

<br>
réponse

<br>

| REPOSITORY      | TAG     | IMAGE ID      | CREATED        | SIZE   |
|-----------------|---------|---------------|----------------|--------|
| hello-world     | latest  | 74cc54e27dc4  | 15 hours ago   | 10.1kB |
| imunes/template | latest  | 58009592de73  | 11 months ago  | 387MB  |

<br>

---
### 3.1.2: Télécharger une image


<br>
commande

```bash
sudo docker pull nginx
```

<br>
réponse

```bash
...
latest: Pulling from library/nginx
...
Status: Downloaded newer image for nginx:latest
...
```

<br>

---

### 3.1.3: Rechercher une image

<br>
commande

```bash
sudo docker search ubuntu
```

<br>
réponse
<br>

| NAME   | DESCRIPTION                                   | STARS  | OFFICIAL |
|--------|-----------------------------------------------|--------|----------|
| ubuntu | Ubuntu is a Debian-based Linux operating sys… | 17450  | [OK]     |

## 3.2: Gestion basique des conteneurs

<br>
commande

```bash
sudo docker run nginx
```
---

<br>
commande

```bash
sudo docker ps
``` 

<br>
réponse

<br>

| CONTAINER ID | IMAGE  | COMMAND                 | CREATED         | STATUS      | PORTS  | NAMES       |
|--------------|--------|-------------------------|-----------------|-------------|--------|-------------|
| 6af66845c771 | nginx  | "/docker-entrypoint.…"  | 10 seconds ago  | Up 9 seconds | 80/tcp | zen_shtern  |


<br>
commande

```bash
sudo docker run -d nginx
```

Avec l'option ```-d```, la commande exécute le conteneur en mode détaché (en arrière-plan). Cela signifie qu'on ne verra pas les journaux et messages du conteneur directement dans le terminal.

<br><br>

# 4: Cycle de vie des conteneurs
## 4.1: Etats des conteneurs
### 4.1.1: Commande d'obserbation

<br>
commande

```bash
sudo docker ps # conteneurs en cours d’excution
```

<br>
réponse

<br>

| CONTAINER ID | IMAGE  | COMMAND                 | CREATED        | STATUS      | PORTS  | NAMES              |
|--------------|--------|-------------------------|----------------|-------------|--------|--------------------|
| cbec3a1a8f85 | nginx  | "/docker-entrypoint.…"  | 8 minutes ago  | Up 8 minutes | 80/tcp | charming_chaplygin |

---

<br>
commande

```bash
sudo docker ps -a # tous les conteneurs
```

<br>
réponse

<br>

| CONTAINER ID | IMAGE         | COMMAND                 | CREATED          | STATUS                        | PORTS  | NAMES              |
|--------------|---------------|-------------------------|------------------|-------------------------------|--------|--------------------|
| cbec3a1a8f85 | nginx         | "/docker-entrypoint.…"  | 10 minutes ago   | Up 10 minutes                 | 80/tcp | charming_chaplygin |
| 6af66845c771 | nginx         | "/docker-entrypoint.…"  | 12 minutes ago   | Exited (0) 11 minutes ago     |        | zen_shtern         |
| c786350697fc | nginx         | "/docker-entrypoint.…"  | 12 minutes ago   | Exited (127) 12 minutes ago   |        | focused_volhard    |
| dd25c9120d17 | nginx         | "/docker-entrypoint.…"  | 13 minutes ago   | Exited (0) 13 minutes ago     |        | loving_wescoff     |
| 649a271af8fb | hello-world   | "/hello"                | 35 minutes ago   | Exited (0) 35 minutes ago     |        | nostalgic_wilson   |
| a502562df335 | hello-world   | "/hello"                | 41 minutes ago   | Exited (0) 41 minutes ago     |        | quirky_fermat      |

---

### 4.1.2: Exercice pratique

<br>
commandes

```bash
sudo docker run -d --name web1 nginx
sudo docker run -d --name web2 nginx
sudo docker run -d --name web3 nginx
```

Après observation avec ```sudo docker ps```, les 3 conteneurs sont ouverts avec l'image nginx. Les noms des conteneurs sont comme attribués en ligne de commande. 
<br>De mon point de vue, les colonnes importantes peuvent être:
>CONTAINER ID<br>IMAGE<br>STATUS<br>NAMES

---

## 4.2: Manipulation des états

<br>
commandes

```bash
sudo docker stop web1
```

<br>
Etat:<br>

> Up -> Exited (0)

---
<br>
commande

```bash
sudo docker start web1
```

<br>
Etat:<br>

> Exited (0) -> Up
---

```bash
sudo docker restart web2
```

Etat:<br>

> Up 12 minutes -> Up 7 seconds
---

<br>
commande

```bash
sudo docker pause web3
```

Etat:<br>

> Up 20 minutes -> Up 20 minutes (Paused)
---

<br>
commande

```bash
sudo docker unpause web3
```

Etat:<br>

> Up 20 minutes (Paused) -> Up 20 minutes 
---

<br>
commande

```bash
sudo docker kill web1
```

<br>
réponse<br>

| CONTAINER ID | IMAGE  | COMMAND                 | CREATED        | STATUS                        | PORTS | NAMES |
|--------------|--------|-------------------------|----------------|-------------------------------|-------|-------|
| 26fe755615fa | nginx  | "/docker-entrypoint.…"  | 5 minutes ago  | Exited (137) 15 seconds ago   |       | web1  |

---
<br><br>
# 5: Inspection et Debug

## 5.1 Logs et monitoring

<br>
commandes

```bash
sudo docker run -d --name web nginx
sudo docker logs web # Observer les logs
```

<br>
réponse<br>


<details>

<summary>Logs de démarrage</summary>

/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration<br> 
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/ <br>
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh <br>
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf <br>
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf <br>
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh <br>
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh <br>
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh <br>
/docker-entrypoint.sh: Configuration complete; ready for start up <br>
2025/01/22 20:47:33 [notice] 1#1: using the "epoll" event method <br>
2025/01/22 20:47:33 [notice] 1#1: nginx/1.27.3 <br>
2025/01/22 20:47:33 [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14) <br>
2025/01/22 20:47:33 [notice] 1#1: OS: Linux 5.15.167.4-microsoft-standard-WSL2 <br>
2025/01/22 20:47:33 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1024:1048576 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker processes <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 29 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 30 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 31 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 32 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 33 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 34 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 35 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 36 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 37 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 38 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 39 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 40 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 41 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 42 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 43 <br>
2025/01/22 20:47:33 [notice] 1#1: start worker process 44
</details>

---

<br>
commande

```bash
sudo docker logs -f web # Observer les logs en temps réel
```

<br>
Même réponse qu'avant mais les nouveaux logs apparaîtront en temps réel

---

<br>
commande

```bash
sudo docker stats
```

<br>réponse
<br>

| CONTAINER ID | NAME  | CPU % | MEM USAGE / LIMIT   | MEM % | NET I/O      | BLOCK I/O | PIDS |
|--------------|-------|-------|---------------------|-------|--------------|-----------|------|
| 6c67a983f4e4 | web   | 0.00% | 12.84MiB / 15.58GiB | 0.08% | 1.23kB / 0B | 0B / 0B   | 17   |

<br><br>

## 5.2: Inspection détaillée

<br>
commande

```bash
sudo docker inspect web # Inspecter un conteneur
```

<br>
réponse<br>


<details>

<summary>Détails du conteneur</summary>

```json
[
    {
        "Id": "6c67a983f4e4a111474ae25c6aacc56a80d7df66e1d2b4f1fe6c8e7e5fb4ab2f",
        "Created": "2025-01-22T20:47:32.703340586Z",
        "Path": "/docker-entrypoint.sh",
        "Args": [
            "nginx",
            "-g",
            "daemon off;"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 9072,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2025-01-22T20:47:32.823047584Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:9bea9f2796e236cb18c2b3ad561ff29f655d1001f9ec7247a0bc5e08d25652a1",
        "ResolvConfPath": "/var/snap/docker/common/var-lib-docker/containers/6c67a983f4e4a111474ae25c6aacc56a80d7df66e1d2b4f1fe6c8e7e5fb4ab2f/resolv.conf",
        "HostnamePath": "/var/snap/docker/common/var-lib-docker/containers/6c67a983f4e4a111474ae25c6aacc56a80d7df66e1d2b4f1fe6c8e7e5fb4ab2f/hostname",
        "HostsPath": "/var/snap/docker/common/var-lib-docker/containers/6c67a983f4e4a111474ae25c6aacc56a80d7df66e1d2b4f1fe6c8e7e5fb4ab2f/hosts",
        "LogPath": "/var/snap/docker/common/var-lib-docker/containers/6c67a983f4e4a111474ae25c6aacc56a80d7df66e1d2b4f1fe6c8e7e5fb4ab2f/6c67a983f4e4a111474ae25c6aacc56a80d7df66e1d2b4f1fe6c8e7e5fb4ab2f-json.log",
        "Name": "/web",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "bridge",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                51,
                102
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "host",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": [],
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware",
                "/sys/devices/virtual/powercap"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/snap/docker/common/var-lib-docker/overlay2/b8e0d3e6cb31fd8a8a321fda5991466336fd93f6bb2f0283666853ef36aece2c-init/diff:/var/snap/docker/common/var-lib-docker/overlay2/0e9a2bfcf0bf84fb8ed6487885f1611d0bc7165b76c1f54af1b682c3f42e6fb3/diff:/var/snap/docker/common/var-lib-docker/overlay2/009e0c2921952bdfcff7e24e78bb55b5daf3dd4ceeb0e6ae48ae14a993b14c6a/diff:/var/snap/docker/common/var-lib-docker/overlay2/2565187cf8113087f5664937ca290d8a696e3f00c9c4e7d531d9be7e70a4c5dc/diff:/var/snap/docker/common/var-lib-docker/overlay2/49efd203162fe6b5cb4b0f1c95e2dc78099e9e0ce315e6d7262afa098f8fbc1b/diff:/var/snap/docker/common/var-lib-docker/overlay2/127f65a52bf43d791a1457574d469901b980b4017b2321a30d4dec35be687cce/diff:/var/snap/docker/common/var-lib-docker/overlay2/47df4353ad86862adee46b3604c7fbba4af79da8437e3379cea5e81c255decb4/diff:/var/snap/docker/common/var-lib-docker/overlay2/a74f29ee71b51f74b0a10c64c440d36e8eb1f9c6bcaef837960e93d5d15a29e7/diff",
                "MergedDir": "/var/snap/docker/common/var-lib-docker/overlay2/b8e0d3e6cb31fd8a8a321fda5991466336fd93f6bb2f0283666853ef36aece2c/merged",
                "UpperDir": "/var/snap/docker/common/var-lib-docker/overlay2/b8e0d3e6cb31fd8a8a321fda5991466336fd93f6bb2f0283666853ef36aece2c/diff",
                "WorkDir": "/var/snap/docker/common/var-lib-docker/overlay2/b8e0d3e6cb31fd8a8a321fda5991466336fd93f6bb2f0283666853ef36aece2c/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "6c67a983f4e4",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "80/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NGINX_VERSION=1.27.3",
                "NJS_VERSION=0.8.7",
                "NJS_RELEASE=1~bookworm",
                "PKG_RELEASE=1~bookworm",
                "DYNPKG_RELEASE=1~bookworm"
            ],
            "Cmd": [
                "nginx",
                "-g",
                "daemon off;"
            ],
            "Image": "nginx",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": [
                "/docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {
                "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
            },
            "StopSignal": "SIGQUIT"
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "a2f4753aabc86e57a54b0c6d34196cbf6e831c37262205d01c0f44a85f229b9c",
            "SandboxKey": "/run/snap.docker/netns/a2f4753aabc8",
            "Ports": {
                "80/tcp": null
            },
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "5b534f1b770b4ee33a6ec0fb2e451fa9dbda647ab29dfb03d361e9e65cbd70b7",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null,
                    "NetworkID": "293174cc6fd941392c8307cea73b6deef16fa1c6a8e03375b2f82d908e81d48a",
                    "EndpointID": "5b534f1b770b4ee33a6ec0fb2e451fa9dbda647ab29dfb03d361e9e65cbd70b7",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": null
                }
            }
        }
    }
]
```

</details>

---

<br>
commande

```bash
sudo docker exec -it web /bin/bash #Exécuter des commandes dans un conteneur
```

Permet d'accéder au conteneur en tant que root, offrant ainsi la possibilité d'exécuter des commandes, de manipuler les fichiers ou d'inspecter l'environnement du conteneur.


---

# 6: Exercice final

## 1

<br>
commande

```bash
sudo docker run -d --name web-test nginx
```
<br>

## 2

<br>
commande

```bash
sudo docker ps
```

<br>
réponse<br>

| CONTAINER ID   | IMAGE  | COMMAND                  | CREATED          | STATUS         | PORTS  | NAMES     |
|----------------|--------|--------------------------|------------------|----------------|--------|-----------|
| 9974f0b7acf1  | nginx  | /docker-entrypoint.sh... | 17 seconds ago   | Up 16 seconds  | 80/tcp | web-test  |


---

<br>
commande

```bash
sudo docker stop web-test
```

<br>
réponse<br>

| CONTAINER ID   | IMAGE  | COMMAND                  | CREATED         | STATUS                  | PORTS  | NAMES     |
|----------------|--------|--------------------------|-----------------|-------------------------|--------|-----------|
| 9974f0b7acf1  | nginx  | /docker-entrypoint.sh... | 3 minutes ago   | Exited (0) 3 seconds ago |        | web-test  |

---

<br>
commande

```bash
sudo docker start web-test
```

<br>
réponse<br>

| CONTAINER ID   | IMAGE  | COMMAND                  | CREATED         | STATUS       | PORTS   | NAMES     |
|----------------|--------|--------------------------|-----------------|--------------|---------|-----------|
| 9974f0b7acf1  | nginx  | /docker-entrypoint.sh... | 4 minutes ago   | Up 2 seconds | 80/tcp  | web-test  |

---

<br>
commande

```bash
sudo docker restart web-test
```

<br>
réponse<br>

| CONTAINER ID   | IMAGE  | COMMAND                  | CREATED         | STATUS       | PORTS   | NAMES     |
|----------------|--------|--------------------------|-----------------|--------------|---------|-----------|
| 9974f0b7acf1  | nginx  | /docker-entrypoint.sh... | 6 minutes ago   | Up 2 seconds | 80/tcp  | web-test  |

---

<br>
commande

```bash
sudo docker pause web-test
```

<br>
réponse<br>

| CONTAINER ID   | IMAGE  | COMMAND                  | CREATED        | STATUS                    | PORTS   | NAMES     |
|----------------|--------|--------------------------|----------------|---------------------------|---------|-----------|
| 9974f0b7acf1  | nginx  | /docker-entrypoint.sh... | 7 minutes ago  | Up About a minute (Paused) | 80/tcp  | web-test  |


---

<br>
commande

```bash
sudo docker unpause web-test
```

<br>
réponse<br>

| CONTAINER ID   | IMAGE  | COMMAND                  | CREATED        | STATUS       | PORTS   | NAMES     |
|----------------|--------|--------------------------|----------------|--------------|---------|-----------|
| 9974f0b7acf1  | nginx  | /docker-entrypoint.sh... | 8 minutes ago  | Up 2 minutes | 80/tcp  | web-test  |


---

<br>
commande

```bash
sudo docker kill web-test
```

<br>
réponse<br>

| CONTAINER ID   | IMAGE  | COMMAND                  | CREATED        | STATUS                 | PORTS   | NAMES     |
|----------------|--------|--------------------------|----------------|------------------------|---------|-----------|
| 9974f0b7acf1  | nginx  | /docker-entrypoint.sh... | 9 minutes ago  | Exited (137) 4 seconds ago |         | web-test  |


## 3

<br>

commande

```bash
sudo docker logs web-test
```

<details>
<summary>Logs de web-test</summary>
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration<br>
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/<br>
/docker-entrypoint.sh: Launching /docker-entrypoint.d/<br>10-listen-on-ipv6-by-default.sh<br>
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf<br>
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf<br>
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh<br>
/docker-entrypoint.sh: Launching /docker-entrypoint.d/<br>20-envsubst-on-templates.sh<br>
/docker-entrypoint.sh: Launching /docker-entrypoint.d/<br>30-tune-worker-processes.sh
<br>/docker-entrypoint.sh: Configuration complete; ready for start up
<br>2025/01/23 08:38:23 [notice] 1#1: using the "epoll" event method
<br>2025/01/23 08:38:23 [notice] 1#1: nginx/1.27.3
<br>2025/01/23 08:38:23 [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14) 
<br>2025/01/23 08:38:23 [notice] 1#1: OS: Linux 6.10.8-arch1-1
<br>2025/01/23 08:38:23 [notice] 1#1: getrlimit(RLIMIT_NOFILE): <br>1073741816:1073741816
<br>2025/01/23 08:38:23 [notice] 1#1: start worker processes
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 29
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 30
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 31
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 32
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 33
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 34
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 35
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 36
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 37
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 38
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 39
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 40
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 41
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 42
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 43
<br>2025/01/23 08:38:23 [notice] 1#1: start worker process 44
<br>2025/01/23 08:41:33 [notice] 1#1: signal 3 (SIGQUIT) received, shutting down
<br>2025/01/23 08:41:33 [notice] 32#32: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 30#30: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 29#29: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 31#31: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 33#33: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 35#35: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 36#36: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 37#37: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 38#38: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 30#30: exiting
<br>2025/01/23 08:41:33 [notice] 32#32: exiting
<br>2025/01/23 08:41:33 [notice] 29#29: exiting
<br>2025/01/23 08:41:33 [notice] 31#31: exiting
<br>2025/01/23 08:41:33 [notice] 40#40: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 34#34: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 39#39: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 33#33: exiting
<br>2025/01/23 08:41:33 [notice] 42#42: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 35#35: exiting
<br>2025/01/23 08:41:33 [notice] 36#36: exiting
<br>2025/01/23 08:41:33 [notice] 37#37: exiting
<br>2025/01/23 08:41:33 [notice] 38#38: exiting
<br>2025/01/23 08:41:33 [notice] 41#41: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 39#39: exiting
<br>2025/01/23 08:41:33 [notice] 40#40: exiting
<br>2025/01/23 08:41:33 [notice] 34#34: exiting
<br>2025/01/23 08:41:33 [notice] 42#42: exiting
<br>2025/01/23 08:41:33 [notice] 41#41: exiting
<br>2025/01/23 08:41:33 [notice] 33#33: exit
<br>2025/01/23 08:41:33 [notice] 29#29: exit
<br>2025/01/23 08:41:33 [notice] 30#30: exit
<br>2025/01/23 08:41:33 [notice] 36#36: exit
<br>2025/01/23 08:41:33 [notice] 31#31: exit
<br>2025/01/23 08:41:33 [notice] 35#35: exit
<br>2025/01/23 08:41:33 [notice] 32#32: exit
<br>2025/01/23 08:41:33 [notice] 38#38: exit
<br>2025/01/23 08:41:33 [notice] 37#37: exit
<br>2025/01/23 08:41:33 [notice] 39#39: exit
<br>2025/01/23 08:41:33 [notice] 44#44: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 40#40: exit
<br>2025/01/23 08:41:33 [notice] 34#34: exit
<br>2025/01/23 08:41:33 [notice] 41#41: exit
<br>2025/01/23 08:41:33 [notice] 42#42: exit
<br>2025/01/23 08:41:33 [notice] 44#44: exiting
<br>2025/01/23 08:41:33 [notice] 44#44: exit
<br>2025/01/23 08:41:33 [notice] 43#43: gracefully shutting down
<br>2025/01/23 08:41:33 [notice] 43#43: exiting
<br>2025/01/23 08:41:33 [notice] 43#43: exit
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 35
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 35 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 39
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 39 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 36
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 36 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 37 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 32 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 38 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 37
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 44
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 33 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 44 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 29 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 33
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 30 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 34
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 34 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 40 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 42 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 40
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 43
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 43 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 31
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 31 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:41:33 [notice] 1#1: signal 17 (SIGCHLD) received from 41
<br>2025/01/23 08:41:33 [notice] 1#1: worker process 41 exited with code 0
<br>2025/01/23 08:41:33 [notice] 1#1: exit
<br>/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
<br>/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
<br>/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
<br>10-listen-on-ipv6-by-default.sh: info: IPv6 listen already enabled
<br>/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
<br>/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
<br>/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
<br>/docker-entrypoint.sh: Configuration complete; ready for start up
<br>2025/01/23 08:43:17 [notice] 1#1: using the "epoll" event method
<br>2025/01/23 08:43:17 [notice] 1#1: nginx/1.27.3
<br>2025/01/23 08:43:17 [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14) 
<br>2025/01/23 08:43:17 [notice] 1#1: OS: Linux 6.10.8-arch1-1
<br>2025/01/23 08:43:17 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1073741816:1073741816
<br>2025/01/23 08:43:17 [notice] 1#1: start worker processes
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 22
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 23
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 24
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 25
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 26
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 27
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 28
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 29
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 30
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 31
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 32
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 33
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 34
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 35
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 36
<br>2025/01/23 08:43:17 [notice] 1#1: start worker process 37
<br>2025/01/23 08:44:36 [notice] 1#1: signal 3 (SIGQUIT) received, shutting down
<br>2025/01/23 08:44:36 [notice] 25#25: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 28#28: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 27#27: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 30#30: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 31#31: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 35#35: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 25#25: exiting
<br>2025/01/23 08:44:36 [notice] 27#27: exiting
<br>2025/01/23 08:44:36 [notice] 24#24: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 26#26: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 23#23: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 22#22: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 33#33: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 30#30: exiting
<br>2025/01/23 08:44:36 [notice] 28#28: exiting
<br>2025/01/23 08:44:36 [notice] 37#37: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 31#31: exiting
<br>2025/01/23 08:44:36 [notice] 32#32: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 35#35: exiting
<br>2025/01/23 08:44:36 [notice] 29#29: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 33#33: exiting
<br>2025/01/23 08:44:36 [notice] 37#37: exiting
<br>2025/01/23 08:44:36 [notice] 23#23: exiting
<br>2025/01/23 08:44:36 [notice] 22#22: exiting
<br>2025/01/23 08:44:36 [notice] 26#26: exiting
<br>2025/01/23 08:44:36 [notice] 24#24: exiting
<br>2025/01/23 08:44:36 [notice] 32#32: exiting
<br>2025/01/23 08:44:36 [notice] 29#29: exiting
<br>2025/01/23 08:44:36 [notice] 30#30: exit
<br>2025/01/23 08:44:36 [notice] 28#28: exit
<br>2025/01/23 08:44:36 [notice] 31#31: exit
<br>2025/01/23 08:44:36 [notice] 27#27: exit
<br>2025/01/23 08:44:36 [notice] 25#25: exit
<br>2025/01/23 08:44:36 [notice] 33#33: exit
<br>2025/01/23 08:44:36 [notice] 35#35: exit
<br>2025/01/23 08:44:36 [notice] 37#37: exit
<br>2025/01/23 08:44:36 [notice] 22#22: exit
<br>2025/01/23 08:44:36 [notice] 24#24: exit
<br>2025/01/23 08:44:36 [notice] 23#23: exit
<br>2025/01/23 08:44:36 [notice] 26#26: exit
<br>2025/01/23 08:44:36 [notice] 29#29: exit
<br>2025/01/23 08:44:36 [notice] 32#32: exit
<br>2025/01/23 08:44:36 [notice] 36#36: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 36#36: exiting
<br>2025/01/23 08:44:36 [notice] 36#36: exit
<br>2025/01/23 08:44:36 [notice] 34#34: gracefully shutting down
<br>2025/01/23 08:44:36 [notice] 34#34: exiting
<br>2025/01/23 08:44:36 [notice] 34#34: exit
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 31
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 31 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 34 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 34
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 35
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 35 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 27
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 27 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 32 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 33
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 33 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 25
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 25 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 24
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 24 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 37
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 37 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 36
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 26 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 36 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 26
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 29 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 29
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 28
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 22 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 28 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 23
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 23 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: signal 29 (SIGIO) received
<br>2025/01/23 08:44:36 [notice] 1#1: signal 17 (SIGCHLD) received from 30
<br>2025/01/23 08:44:36 [notice] 1#1: worker process 30 exited with code 0
<br>2025/01/23 08:44:36 [notice] 1#1: exit
<br>/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
<br>/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
<br>/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
<br>10-listen-on-ipv6-by-default.sh: info: IPv6 listen already enabled
<br>/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
<br>/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
<br>/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
<br>/docker-entrypoint.sh: Configuration complete; ready for start up
<br>2025/01/23 08:44:37 [notice] 1#1: using the "epoll" event method
<br>2025/01/23 08:44:37 [notice] 1#1: nginx/1.27.3
<br>2025/01/23 08:44:37 [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14) 
<br>2025/01/23 08:44:37 [notice] 1#1: OS: Linux 6.10.8-arch1-1
<br>2025/01/23 08:44:37 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1073741816:1073741816
<br>2025/01/23 08:44:37 [notice] 1#1: start worker processes
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 22
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 23
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 24
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 25
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 26
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 27
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 28
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 29
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 30
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 31
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 32
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 33
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 34
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 35
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 36
<br>2025/01/23 08:44:37 [notice] 1#1: start worker process 37
</details>

---

```bash
2025/01/23 08:38:23 [notice] 1#1: start worker processes
```

début des processus du conteneur

---

```bash
2025/01/23 08:41:33 [notice] 1#1: signal 3 (SIGQUIT) received, shutting down
```

Le conteneur a reçu ma commande ```stop```

---

```bash
2025/01/23 08:43:17 [notice] 1#1: start worker processes
```

Le conteneur a reçu ma commande ```start```

---

```bash
2025/01/23 08:44:36 [notice] 1#1: signal 3 (SIGQUIT) received, shutting down
...
2025/01/23 08:44:37 [notice] 1#1: start worker processes
```

Le conteneur a reçu ma commande ```restart```

---

Mes commandes ```pause```, ```unpause``` et ```kill``` ne sont pas affichés dans les logs.

---
<br>
commande

```bash
sudo docker inspect web-test
```

<details>

<summary>Inspection de web-test</summary>

```json
[
    {
        "Id": "9974f0b7acf1b01f056d526a4ff31dc24a4433ffd143b5386e8a2d6d0a160150",
        "Created": "2025-01-23T08:38:22.781335537Z",
        "Path": "/docker-entrypoint.sh",
        "Args": [
            "nginx",
            "-g",
            "daemon off;"
        ],
        "State": {
            "Status": "exited",
            "Running": false,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
            "ExitCode": 137,
            "Error": "",
            "StartedAt": "2025-01-23T08:44:36.980675603Z",
            "FinishedAt": "2025-01-23T08:47:46.608345687Z"
        },
        "Image": "sha256:9bea9f2796e236cb18c2b3ad561ff29f655d1001f9ec7247a0bc5e08d25652a1",
        "ResolvConfPath": "/var/lib/docker/containers/9974f0b7acf1b01f056d526a4ff31dc24a4433ffd143b5386e8a2d6d0a160150/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/9974f0b7acf1b01f056d526a4ff31dc24a4433ffd143b5386e8a2d6d0a160150/hostname",
        "HostsPath": "/var/lib/docker/containers/9974f0b7acf1b01f056d526a4ff31dc24a4433ffd143b5386e8a2d6d0a160150/hosts",
        "LogPath": "/var/lib/docker/containers/9974f0b7acf1b01f056d526a4ff31dc24a4433ffd143b5386e8a2d6d0a160150/9974f0b7acf1b01f056d526a4ff31dc24a4433ffd143b5386e8a2d6d0a160150-json.log",
        "Name": "/web-test",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "bridge",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                24,
                132
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "private",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": [],
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware",
                "/sys/devices/virtual/powercap"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/337c9e09331b01dd00e8c0daf6f4ea9f18fdf61fb9616f228165d25b998977dd-init/diff:/var/lib/docker/overlay2/7bf28f96bcad0aa1ace297da5ec7a50cadb09a1f27a76cd6b139e5029151b1c3/diff:/var/lib/docker/overlay2/dc2f23c66def978f9d718d1764ea2c47d7a7ab82ccae924f2c4ae0e23e5ff980/diff:/var/lib/docker/overlay2/605097388fe50e066e29810e8f6235d9cd3cea95ddb9d1c6bb2e025ea8684c02/diff:/var/lib/docker/overlay2/707325099c89eb85d7e3b9e29848c93e4f76b118402b6584f835af66e4485eac/diff:/var/lib/docker/overlay2/27b7e363d6b6d5a59f11648bdfc9df46c0201b733fdce4e36fd8660cac3e3410/diff:/var/lib/docker/overlay2/30496225df42ba161ce79f5664cdcbcde4669057f64c729efbbcbb80fb261f64/diff:/var/lib/docker/overlay2/c94ff2babcbd9f27778fab20651995db23fca447b48a87505f88de1e764652c8/diff",
                "MergedDir": "/var/lib/docker/overlay2/337c9e09331b01dd00e8c0daf6f4ea9f18fdf61fb9616f228165d25b998977dd/merged",
                "UpperDir": "/var/lib/docker/overlay2/337c9e09331b01dd00e8c0daf6f4ea9f18fdf61fb9616f228165d25b998977dd/diff",
                "WorkDir": "/var/lib/docker/overlay2/337c9e09331b01dd00e8c0daf6f4ea9f18fdf61fb9616f228165d25b998977dd/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "9974f0b7acf1",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "80/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NGINX_VERSION=1.27.3",
                "NJS_VERSION=0.8.7",
                "NJS_RELEASE=1~bookworm",
                "PKG_RELEASE=1~bookworm",
                "DYNPKG_RELEASE=1~bookworm"
            ],
            "Cmd": [
                "nginx",
                "-g",
                "daemon off;"
            ],
            "Image": "nginx",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": [
                "/docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {
                "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
            },
            "StopSignal": "SIGQUIT"
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "",
            "SandboxKey": "",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "",
                    "DriverOpts": null,
                    "NetworkID": "c17fd4903bf1292088edc7e848b381dfc07395b64bd67cab279a1a4109e5a1f0",
                    "EndpointID": "",
                    "Gateway": "",
                    "IPAddress": "",
                    "IPPrefixLen": 0,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": null
                }
            }
        }
    }
]
```

</details>

---

```json
"ExitCode": 137,
```

Cela veux dire que le conteneur a été terminé par un signal ```SIGKILL```,<br> soit ma commande ```sudo docker kill web-test```


## 4

```bash
sudo docker rm web-test
```

Le conteneur n'est plus visible dans ```ps -a```.