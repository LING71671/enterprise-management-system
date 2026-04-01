# Git 命令大全（新手必读）

> **本仓库信息**
> - 仓库地址：`https://github.com/LING71671/enterprise-management-system.git`
> - 默认分支：`main`
> - 项目路径：`web/`

---

### 基础配置（首次使用必做）

```bash
# 设置用户名（改成你自己的）
git config --global user.name "你的名字"

# 设置邮箱（改成你自己的）
git config --global user.email "你的邮箱@example.com"

# 查看当前配置
git config --list

# 设置默认分支名
git config --global init.defaultBranch main
```

---

### 克隆本项目

```bash
# 克隆本项目到本地
git clone https://github.com/LING71671/enterprise-management-system.git

# 进入项目目录
cd enterprise-management-system/web
```

---

### 查看状态

```bash
# 查看当前状态（修改了哪些文件）
git status

# 查看简短状态
git status -s

# 查看提交历史
git log

# 查看简洁历史（一行显示）
git log --oneline

# 查看最近3次提交
git log -3

# 查看某个文件的修改历史
git log --follow src/assets/css/pages/production.css

# 查看文件具体修改内容
git diff

# 查看已暂存的修改
git diff --staged
```

---

### 分支操作

```bash
# 查看所有分支
git branch

# 查看远程分支
git branch -r

# 查看所有分支（本地+远程）
git branch -a

# 创建新分支
git branch feature/my-feature

# 切换分支
git checkout main

# 创建并切换到新分支（推荐）
git checkout -b feature/my-feature

# ===== 本项目推荐的分支命名 =====

# 功能分支
git checkout -b feature/production-plan # 生产计划管理功能
git checkout -b feature/sales-customer # 客户信息管理功能
git checkout -b feature/equipment-monitor # 设备监控功能

# 修复分支
git checkout -b fix/login-error # 修复登录问题
git checkout -b fix/style-button # 修复按钮样式

# 样式调整分支
git checkout -b style/dashboard-layout # 调整仪表盘布局

# 文档分支
git checkout -b docs/api-guide # 更新API文档

# ===== 分支管理 =====

# 删除本地分支
git branch -d feature/my-feature

# 强制删除分支（如果分支未合并）
git branch -D feature/my-feature

# 删除远程分支
git push origin --delete feature/my-feature

# 重命名分支
git branch -m feature/old-name feature/new-name

# 合并分支到当前分支
git merge feature/my-feature
```

---

### 添加和提交

```bash
# 添加单个文件到暂存区
git add src/assets/css/pages/production.css

# 添加多个文件
git add src/assets/css/pages/production.css src/assets/js/modules/production.js

# 添加所有修改的文件（推荐）
git add .

# 添加所有文件（包括删除的）
git add -A

# 只添加已跟踪文件的修改
git add -u

# 提交暂存区的文件
git commit -m "feat: 添加生产计划管理页面样式"

# 添加并提交（合并写法，仅适用于已跟踪文件）
git commit -am "fix: 修复生产管理页面样式问题"

# 修改上一次提交信息（未push时使用）
git commit --amend -m "feat: 添加生产计划管理页面完整样式"
```

---

### 推送和拉取（本项目专用）

```bash
# ===== 推送到本项目远程仓库 =====

# 推送当前分支到远程（已设置上游分支后使用）
git push

# 首次推送并设置上游分支（推荐）
git push -u origin feature/my-feature

# 推送到 main 分支
git push origin main

# 推送到指定分支
git push origin feature/production-plan


# ===== 从本项目拉取更新 =====

# 拉取 main 分支最新代码
git pull origin main

# 拉取当前分支最新代码
git pull

# 拉取但不合并（只下载）
git fetch origin

# 查看远程仓库信息
git remote -v
```

---

### 撤销操作

```bash
# 撤销工作区的修改（丢弃修改，危险操作）
git checkout -- src/assets/css/pages/production.css

# 撤销所有工作区修改
git checkout -- .

# 撤销暂存区的文件（取消 add）
git reset HEAD src/assets/css/pages/production.css

# 撤销所有暂存
git reset HEAD

# 撤销最近一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最近一次提交（不保留修改，危险操作）
git reset --hard HEAD~1

# 撤销最近两次提交
git reset --hard HEAD~2

# 回退到指定提交
git reset --hard e2d466e

# 查看已删除的提交（用于恢复）
git reflog

# 恢复误删的提交
git reset --hard e2d466e
```

---

### 暂存工作

```bash
# 暂存当前工作（切换分支前使用）
git stash

# 暂存并添加说明
git stash save "生产计划页面样式开发中"

# 查看暂存列表
git stash list

# 恢复最近的暂存
git stash pop

# 恢复暂存但不删除记录
git stash apply

# 恢复指定的暂存
git stash apply stash@{0}

# 删除暂存
git stash drop stash@{0}

# 删除所有暂存
git stash clear
```

---

### 标签管理

```bash
# 创建标签
git tag v1.0.0

# 创建带说明的标签
git tag -a v1.0.0 -m "企业管理系统前端 v1.0.0 发布"

# 查看所有标签
git tag

# 查看标签详情
git show v1.0.0

# 推送标签到远程
git push origin v1.0.0

# 推送所有标签
git push --tags

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete tag v1.0.0
```

---

### 解决冲突

```bash
# 查看冲突文件
git status

# 编辑冲突文件后，标记为已解决
git add 冲突文件名

# 提交合并结果
git commit -m "fix: 解决生产管理页面样式合并冲突"

# 取消合并
git merge --abort

# 使用 ours 策略（保留当前分支）
git checkout --ours src/assets/css/pages/production.css

# 使用 theirs 策略（保留合并分支）
git checkout --theirs src/assets/css/pages/production.css
```

---

### 团队协作完整流程（本项目专用）

#### 场景一：新人首次参与开发

```bash
# 1. 克隆项目
git clone https://github.com/LING71671/enterprise-management-system.git
cd enterprise-management-system/web

# 2. 安装依赖
npm install

# 3. 创建自己的功能分支
git checkout -b feature/production-plan

# 4. 开发代码...

# 5. 查看修改
git status

# 6. 添加修改
git add .

# 7. 提交修改
git commit -m "feat: 完成生产计划管理页面基础结构"

# 8. 推送到远程
git push -u origin feature/production-plan

# 9. 在 GitHub 上创建 Pull Request
# 访问: https://github.com/LING71671/enterprise-management-system
# 点击 "New Pull Request"

# 10. 等待代码审查通过后合并
```

#### 场景二：日常开发流程

```bash
# 1. 每天开始工作前，先拉取最新代码
git checkout main
git pull origin main

# 2. 创建或切换到功能分支
git checkout -b feature/sales-customer
# 或者继续之前的分支
git checkout feature/sales-customer

# 3. 开发代码...

# 4. 定期提交（小步提交）
git add src/pages/sales/customer.html
git commit -m "feat: 添加客户信息管理页面结构"

git add src/assets/css/pages/sales.css
git commit -m "feat: 添加销售管理页面样式"

# 5. 推送到远程
git push origin feature/sales-customer

# 6. 创建 Pull Request 并等待合并
```

#### 场景三：合并后清理分支

```bash
# 1. 切换到 main 分支
git checkout main

# 2. 拉取最新代码
git pull origin main

# 3. 删除本地已合并的分支
git branch -d feature/production-plan

# 4. 删除远程已合并的分支
git push origin --delete feature/production-plan
```

#### 场景四：解决 main 分支冲突

```bash
# 1. 切换到 main 分支，拉取最新
git checkout main
git pull origin main

# 2. 切换回功能分支
git checkout feature/production-plan

# 3. 合并 main 到功能分支
git merge main

# 4. 如果有冲突，解决冲突
# 打开冲突文件，找到 <<<<<<< HEAD ====== >>>>>>> main 标记
# 手动编辑解决冲突

# 5. 添加解决后的文件
git add .

# 6. 提交合并结果
git commit -m "fix: 解决与 main 分支的合并冲突"

# 7. 推送
git push origin feature/production-plan
```

---

### 常见问题解决

#### 问题1：提交错文件了

```bash
# 撤销最近一次提交（保留修改）
git reset --soft HEAD~1

# 重新添加正确的文件
git add src/assets/css/pages/production.css
git commit -m "feat: 添加生产计划管理页面样式"
```

#### 问题2：push 被拒绝

```bash
# 先拉取远程更新
git pull origin main

# 如果有冲突，解决后再提交
git add .
git commit -m "fix: 解决合并冲突"
git push origin main
```

#### 问题3：想放弃所有本地修改

```bash
# 重置到远程 main 状态
git fetch origin
git reset --hard origin/main
```

#### 问题4：误删了分支

```bash
# 查看操作记录
git reflog

# 找到删除前的提交 ID，恢复
git checkout -b feature/production-plan e2d466e
```

#### 问题5：合并了错误的分支

```bash
# 在 push 之前可以撤销
git reset --hard HEAD~1

# 如果已经 push，需要创建新提交来撤销
git revert -m 1 e2d466e
```

#### 问题6：想查看某个提交的详细内容

```bash
# 查看某个提交的内容
git show e2d466e

# 查看某个提交的某个文件
git show e2d466e:src/assets/css/pages/production.css
```

---

### Git 提交规范（本项目专用）

```bash
# 功能开发
feat: 添加生产计划管理页面
feat: 完成销售管理子系统客户信息模块
feat: 实现设备状态监控数据展示

# 修复问题
fix: 修复登录页面验证码不显示问题
fix: 修复侧边栏菜单点击无响应
fix: 修复表格排序功能异常

# 样式调整
style: 调整按钮圆角和间距
style: 优化登录页面响应式布局
style: 统一表格样式配色

# 代码重构
refactor: 重构导航切换逻辑
refactor: 优化表单验证代码结构

# 文档更新
docs: 更新 README 开发指南
docs: 添加 Git 协作流程说明

# 其他
chore: 更新 .gitignore 配置
perf: 优化表格渲染性能
```

---

### 本项目常用命令速查

| 场景 | 命令 |
|------|------|
| 克隆项目 | `git clone https://github.com/LING71671/enterprise-management-system.git` |
| 拉取最新 | `git pull origin main` |
| 创建功能分支 | `git checkout -b feature/功能名` |
| 查看状态 | `git status` |
| 添加所有修改 | `git add .` |
| 提交 | `git commit -m "feat: 描述"` |
| 推送分支 | `git push -u origin feature/功能名` |
| 切换到 main | `git checkout main` |
| 合并 main | `git merge main` |
| 放弃本地修改 | `git checkout -- .` |
| 查看历史 | `git log --oneline` |
